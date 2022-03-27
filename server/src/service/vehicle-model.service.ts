import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleModelDTO } from '../service/dto/vehicle-model.dto';
import { VehicleModelMapper } from '../service/mapper/vehicle-model.mapper';
import { VehicleModelRepository } from '../repository/vehicle-model.repository';

const relationshipNames = [];
relationshipNames.push('vehicleManufacturer');
relationshipNames.push('vehicleType');

@Injectable()
export class VehicleModelService {
  logger = new Logger('VehicleModelService');

  constructor(@InjectRepository(VehicleModelRepository) private vehicleModelEntityRepository: VehicleModelRepository) {}

  async findById(id: number): Promise<VehicleModelDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleModelEntityRepository.findOne(id, options);
    return VehicleModelMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleModelDTO>): Promise<VehicleModelDTO | undefined> {
    const result = await this.vehicleModelEntityRepository.findOne(options);
    return VehicleModelMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleModelDTO>): Promise<[VehicleModelDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleModelEntityRepository.findAndCount(options);
    const vehicleModelEntityDTO: VehicleModelDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleModelEntity => vehicleModelEntityDTO.push(VehicleModelMapper.fromEntityToDTO(vehicleModelEntity)));
      resultList[0] = vehicleModelEntityDTO;
    }
    return resultList;
  }

  async save(vehicleModelEntityDTO: VehicleModelDTO, creator?: string): Promise<VehicleModelDTO | undefined> {
    const entity = VehicleModelMapper.fromDTOtoEntity(vehicleModelEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleModelEntityRepository.save(entity);
    return VehicleModelMapper.fromEntityToDTO(result);
  }

  async update(vehicleModelEntityDTO: VehicleModelDTO, updater?: string): Promise<VehicleModelDTO | undefined> {
    const entity = VehicleModelMapper.fromDTOtoEntity(vehicleModelEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleModelEntityRepository.save(entity);
    return VehicleModelMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleModelEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
