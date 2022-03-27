import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleTrimDTO } from '../service/dto/vehicle-trim.dto';
import { VehicleTrimMapper } from '../service/mapper/vehicle-trim.mapper';
import { VehicleTrimRepository } from '../repository/vehicle-trim.repository';

const relationshipNames = [];
relationshipNames.push('vehicleModel');

@Injectable()
export class VehicleTrimService {
  logger = new Logger('VehicleTrimService');

  constructor(@InjectRepository(VehicleTrimRepository) private vehicleTrimEntityRepository: VehicleTrimRepository) {}

  async findById(id: number): Promise<VehicleTrimDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleTrimEntityRepository.findOne(id, options);
    return VehicleTrimMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleTrimDTO>): Promise<VehicleTrimDTO | undefined> {
    const result = await this.vehicleTrimEntityRepository.findOne(options);
    return VehicleTrimMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleTrimDTO>): Promise<[VehicleTrimDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleTrimEntityRepository.findAndCount(options);
    const vehicleTrimEntityDTO: VehicleTrimDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleTrimEntity => vehicleTrimEntityDTO.push(VehicleTrimMapper.fromEntityToDTO(vehicleTrimEntity)));
      resultList[0] = vehicleTrimEntityDTO;
    }
    return resultList;
  }

  async save(vehicleTrimEntityDTO: VehicleTrimDTO, creator?: string): Promise<VehicleTrimDTO | undefined> {
    const entity = VehicleTrimMapper.fromDTOtoEntity(vehicleTrimEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleTrimEntityRepository.save(entity);
    return VehicleTrimMapper.fromEntityToDTO(result);
  }

  async update(vehicleTrimEntityDTO: VehicleTrimDTO, updater?: string): Promise<VehicleTrimDTO | undefined> {
    const entity = VehicleTrimMapper.fromDTOtoEntity(vehicleTrimEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleTrimEntityRepository.save(entity);
    return VehicleTrimMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleTrimEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
