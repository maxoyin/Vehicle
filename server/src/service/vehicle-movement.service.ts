import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleMovementDTO } from '../service/dto/vehicle-movement.dto';
import { VehicleMovementMapper } from '../service/mapper/vehicle-movement.mapper';
import { VehicleMovementRepository } from '../repository/vehicle-movement.repository';

const relationshipNames = [];

@Injectable()
export class VehicleMovementService {
  logger = new Logger('VehicleMovementService');

  constructor(@InjectRepository(VehicleMovementRepository) private vehicleMovementEntityRepository: VehicleMovementRepository) {}

  async findById(id: number): Promise<VehicleMovementDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleMovementEntityRepository.findOne(id, options);
    return VehicleMovementMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleMovementDTO>): Promise<VehicleMovementDTO | undefined> {
    const result = await this.vehicleMovementEntityRepository.findOne(options);
    return VehicleMovementMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleMovementDTO>): Promise<[VehicleMovementDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleMovementEntityRepository.findAndCount(options);
    const vehicleMovementEntityDTO: VehicleMovementDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleMovementEntity =>
        vehicleMovementEntityDTO.push(VehicleMovementMapper.fromEntityToDTO(vehicleMovementEntity))
      );
      resultList[0] = vehicleMovementEntityDTO;
    }
    return resultList;
  }

  async save(vehicleMovementEntityDTO: VehicleMovementDTO, creator?: string): Promise<VehicleMovementDTO | undefined> {
    const entity = VehicleMovementMapper.fromDTOtoEntity(vehicleMovementEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleMovementEntityRepository.save(entity);
    return VehicleMovementMapper.fromEntityToDTO(result);
  }

  async update(vehicleMovementEntityDTO: VehicleMovementDTO, updater?: string): Promise<VehicleMovementDTO | undefined> {
    const entity = VehicleMovementMapper.fromDTOtoEntity(vehicleMovementEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleMovementEntityRepository.save(entity);
    return VehicleMovementMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleMovementEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
