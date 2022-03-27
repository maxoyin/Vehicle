import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleMovementHistoryDTO } from '../service/dto/vehicle-movement-history.dto';
import { VehicleMovementHistoryMapper } from '../service/mapper/vehicle-movement-history.mapper';
import { VehicleMovementHistoryRepository } from '../repository/vehicle-movement-history.repository';

const relationshipNames = [];
relationshipNames.push('vehicleMovement');

@Injectable()
export class VehicleMovementHistoryService {
  logger = new Logger('VehicleMovementHistoryService');

  constructor(
    @InjectRepository(VehicleMovementHistoryRepository) private vehicleMovementHistoryEntityRepository: VehicleMovementHistoryRepository
  ) {}

  async findById(id: number): Promise<VehicleMovementHistoryDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleMovementHistoryEntityRepository.findOne(id, options);
    return VehicleMovementHistoryMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleMovementHistoryDTO>): Promise<VehicleMovementHistoryDTO | undefined> {
    const result = await this.vehicleMovementHistoryEntityRepository.findOne(options);
    return VehicleMovementHistoryMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleMovementHistoryDTO>): Promise<[VehicleMovementHistoryDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleMovementHistoryEntityRepository.findAndCount(options);
    const vehicleMovementHistoryEntityDTO: VehicleMovementHistoryDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleMovementHistoryEntity =>
        vehicleMovementHistoryEntityDTO.push(VehicleMovementHistoryMapper.fromEntityToDTO(vehicleMovementHistoryEntity))
      );
      resultList[0] = vehicleMovementHistoryEntityDTO;
    }
    return resultList;
  }

  async save(vehicleMovementHistoryEntityDTO: VehicleMovementHistoryDTO, creator?: string): Promise<VehicleMovementHistoryDTO | undefined> {
    const entity = VehicleMovementHistoryMapper.fromDTOtoEntity(vehicleMovementHistoryEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleMovementHistoryEntityRepository.save(entity);
    return VehicleMovementHistoryMapper.fromEntityToDTO(result);
  }

  async update(
    vehicleMovementHistoryEntityDTO: VehicleMovementHistoryDTO,
    updater?: string
  ): Promise<VehicleMovementHistoryDTO | undefined> {
    const entity = VehicleMovementHistoryMapper.fromDTOtoEntity(vehicleMovementHistoryEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleMovementHistoryEntityRepository.save(entity);
    return VehicleMovementHistoryMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleMovementHistoryEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
