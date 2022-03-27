import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleMovementChecklistDTO } from '../service/dto/vehicle-movement-checklist.dto';
import { VehicleMovementChecklistMapper } from '../service/mapper/vehicle-movement-checklist.mapper';
import { VehicleMovementChecklistRepository } from '../repository/vehicle-movement-checklist.repository';

const relationshipNames = [];
relationshipNames.push('vehicleMovement');
relationshipNames.push('vehicleMovementHistory');

@Injectable()
export class VehicleMovementChecklistService {
  logger = new Logger('VehicleMovementChecklistService');

  constructor(
    @InjectRepository(VehicleMovementChecklistRepository)
    private vehicleMovementChecklistEntityRepository: VehicleMovementChecklistRepository
  ) {}

  async findById(id: number): Promise<VehicleMovementChecklistDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleMovementChecklistEntityRepository.findOne(id, options);
    return VehicleMovementChecklistMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleMovementChecklistDTO>): Promise<VehicleMovementChecklistDTO | undefined> {
    const result = await this.vehicleMovementChecklistEntityRepository.findOne(options);
    return VehicleMovementChecklistMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleMovementChecklistDTO>): Promise<[VehicleMovementChecklistDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleMovementChecklistEntityRepository.findAndCount(options);
    const vehicleMovementChecklistEntityDTO: VehicleMovementChecklistDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleMovementChecklistEntity =>
        vehicleMovementChecklistEntityDTO.push(VehicleMovementChecklistMapper.fromEntityToDTO(vehicleMovementChecklistEntity))
      );
      resultList[0] = vehicleMovementChecklistEntityDTO;
    }
    return resultList;
  }

  async save(
    vehicleMovementChecklistEntityDTO: VehicleMovementChecklistDTO,
    creator?: string
  ): Promise<VehicleMovementChecklistDTO | undefined> {
    const entity = VehicleMovementChecklistMapper.fromDTOtoEntity(vehicleMovementChecklistEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleMovementChecklistEntityRepository.save(entity);
    return VehicleMovementChecklistMapper.fromEntityToDTO(result);
  }

  async update(
    vehicleMovementChecklistEntityDTO: VehicleMovementChecklistDTO,
    updater?: string
  ): Promise<VehicleMovementChecklistDTO | undefined> {
    const entity = VehicleMovementChecklistMapper.fromDTOtoEntity(vehicleMovementChecklistEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleMovementChecklistEntityRepository.save(entity);
    return VehicleMovementChecklistMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleMovementChecklistEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
