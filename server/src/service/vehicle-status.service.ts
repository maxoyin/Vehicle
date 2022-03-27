import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleStatusDTO } from '../service/dto/vehicle-status.dto';
import { VehicleStatusMapper } from '../service/mapper/vehicle-status.mapper';
import { VehicleStatusRepository } from '../repository/vehicle-status.repository';

const relationshipNames = [];

@Injectable()
export class VehicleStatusService {
  logger = new Logger('VehicleStatusService');

  constructor(@InjectRepository(VehicleStatusRepository) private vehicleStatusEntityRepository: VehicleStatusRepository) {}

  async findById(id: number): Promise<VehicleStatusDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleStatusEntityRepository.findOne(id, options);
    return VehicleStatusMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleStatusDTO>): Promise<VehicleStatusDTO | undefined> {
    const result = await this.vehicleStatusEntityRepository.findOne(options);
    return VehicleStatusMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleStatusDTO>): Promise<[VehicleStatusDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleStatusEntityRepository.findAndCount(options);
    const vehicleStatusEntityDTO: VehicleStatusDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleStatusEntity => vehicleStatusEntityDTO.push(VehicleStatusMapper.fromEntityToDTO(vehicleStatusEntity)));
      resultList[0] = vehicleStatusEntityDTO;
    }
    return resultList;
  }

  async save(vehicleStatusEntityDTO: VehicleStatusDTO, creator?: string): Promise<VehicleStatusDTO | undefined> {
    const entity = VehicleStatusMapper.fromDTOtoEntity(vehicleStatusEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleStatusEntityRepository.save(entity);
    return VehicleStatusMapper.fromEntityToDTO(result);
  }

  async update(vehicleStatusEntityDTO: VehicleStatusDTO, updater?: string): Promise<VehicleStatusDTO | undefined> {
    const entity = VehicleStatusMapper.fromDTOtoEntity(vehicleStatusEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleStatusEntityRepository.save(entity);
    return VehicleStatusMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleStatusEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
