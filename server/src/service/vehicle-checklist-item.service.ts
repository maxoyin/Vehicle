import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleChecklistItemDTO } from '../service/dto/vehicle-checklist-item.dto';
import { VehicleChecklistItemMapper } from '../service/mapper/vehicle-checklist-item.mapper';
import { VehicleChecklistItemRepository } from '../repository/vehicle-checklist-item.repository';

const relationshipNames = [];

@Injectable()
export class VehicleChecklistItemService {
  logger = new Logger('VehicleChecklistItemService');

  constructor(
    @InjectRepository(VehicleChecklistItemRepository) private vehicleChecklistItemEntityRepository: VehicleChecklistItemRepository
  ) {}

  async findById(id: number): Promise<VehicleChecklistItemDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleChecklistItemEntityRepository.findOne(id, options);
    return VehicleChecklistItemMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleChecklistItemDTO>): Promise<VehicleChecklistItemDTO | undefined> {
    const result = await this.vehicleChecklistItemEntityRepository.findOne(options);
    return VehicleChecklistItemMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleChecklistItemDTO>): Promise<[VehicleChecklistItemDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleChecklistItemEntityRepository.findAndCount(options);
    const vehicleChecklistItemEntityDTO: VehicleChecklistItemDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleChecklistItemEntity =>
        vehicleChecklistItemEntityDTO.push(VehicleChecklistItemMapper.fromEntityToDTO(vehicleChecklistItemEntity))
      );
      resultList[0] = vehicleChecklistItemEntityDTO;
    }
    return resultList;
  }

  async save(vehicleChecklistItemEntityDTO: VehicleChecklistItemDTO, creator?: string): Promise<VehicleChecklistItemDTO | undefined> {
    const entity = VehicleChecklistItemMapper.fromDTOtoEntity(vehicleChecklistItemEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleChecklistItemEntityRepository.save(entity);
    return VehicleChecklistItemMapper.fromEntityToDTO(result);
  }

  async update(vehicleChecklistItemEntityDTO: VehicleChecklistItemDTO, updater?: string): Promise<VehicleChecklistItemDTO | undefined> {
    const entity = VehicleChecklistItemMapper.fromDTOtoEntity(vehicleChecklistItemEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleChecklistItemEntityRepository.save(entity);
    return VehicleChecklistItemMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleChecklistItemEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
