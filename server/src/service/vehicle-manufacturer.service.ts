import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleManufacturerDTO } from '../service/dto/vehicle-manufacturer.dto';
import { VehicleManufacturerMapper } from '../service/mapper/vehicle-manufacturer.mapper';
import { VehicleManufacturerRepository } from '../repository/vehicle-manufacturer.repository';

const relationshipNames = [];

@Injectable()
export class VehicleManufacturerService {
  logger = new Logger('VehicleManufacturerService');

  constructor(
    @InjectRepository(VehicleManufacturerRepository) private vehicleManufacturerEntityRepository: VehicleManufacturerRepository
  ) {}

  async findById(id: number): Promise<VehicleManufacturerDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleManufacturerEntityRepository.findOne(id, options);
    return VehicleManufacturerMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleManufacturerDTO>): Promise<VehicleManufacturerDTO | undefined> {
    const result = await this.vehicleManufacturerEntityRepository.findOne(options);
    return VehicleManufacturerMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleManufacturerDTO>): Promise<[VehicleManufacturerDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleManufacturerEntityRepository.findAndCount(options);
    const vehicleManufacturerEntityDTO: VehicleManufacturerDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleManufacturerEntity =>
        vehicleManufacturerEntityDTO.push(VehicleManufacturerMapper.fromEntityToDTO(vehicleManufacturerEntity))
      );
      resultList[0] = vehicleManufacturerEntityDTO;
    }
    return resultList;
  }

  async save(vehicleManufacturerEntityDTO: VehicleManufacturerDTO, creator?: string): Promise<VehicleManufacturerDTO | undefined> {
    const entity = VehicleManufacturerMapper.fromDTOtoEntity(vehicleManufacturerEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleManufacturerEntityRepository.save(entity);
    return VehicleManufacturerMapper.fromEntityToDTO(result);
  }

  async update(vehicleManufacturerEntityDTO: VehicleManufacturerDTO, updater?: string): Promise<VehicleManufacturerDTO | undefined> {
    const entity = VehicleManufacturerMapper.fromDTOtoEntity(vehicleManufacturerEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleManufacturerEntityRepository.save(entity);
    return VehicleManufacturerMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleManufacturerEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
