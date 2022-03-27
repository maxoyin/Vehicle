import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleStatChangeSubReasonDTO } from '../service/dto/vehicle-stat-change-sub-reason.dto';
import { VehicleStatChangeSubReasonMapper } from '../service/mapper/vehicle-stat-change-sub-reason.mapper';
import { VehicleStatChangeSubReasonRepository } from '../repository/vehicle-stat-change-sub-reason.repository';

const relationshipNames = [];
relationshipNames.push('vehicleStatusChangeReason');

@Injectable()
export class VehicleStatChangeSubReasonService {
  logger = new Logger('VehicleStatChangeSubReasonService');

  constructor(
    @InjectRepository(VehicleStatChangeSubReasonRepository)
    private vehicleStatChangeSubReasonEntityRepository: VehicleStatChangeSubReasonRepository
  ) {}

  async findById(id: number): Promise<VehicleStatChangeSubReasonDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleStatChangeSubReasonEntityRepository.findOne(id, options);
    return VehicleStatChangeSubReasonMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleStatChangeSubReasonDTO>): Promise<VehicleStatChangeSubReasonDTO | undefined> {
    const result = await this.vehicleStatChangeSubReasonEntityRepository.findOne(options);
    return VehicleStatChangeSubReasonMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleStatChangeSubReasonDTO>): Promise<[VehicleStatChangeSubReasonDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleStatChangeSubReasonEntityRepository.findAndCount(options);
    const vehicleStatChangeSubReasonEntityDTO: VehicleStatChangeSubReasonDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleStatChangeSubReasonEntity =>
        vehicleStatChangeSubReasonEntityDTO.push(VehicleStatChangeSubReasonMapper.fromEntityToDTO(vehicleStatChangeSubReasonEntity))
      );
      resultList[0] = vehicleStatChangeSubReasonEntityDTO;
    }
    return resultList;
  }

  async save(
    vehicleStatChangeSubReasonEntityDTO: VehicleStatChangeSubReasonDTO,
    creator?: string
  ): Promise<VehicleStatChangeSubReasonDTO | undefined> {
    const entity = VehicleStatChangeSubReasonMapper.fromDTOtoEntity(vehicleStatChangeSubReasonEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleStatChangeSubReasonEntityRepository.save(entity);
    return VehicleStatChangeSubReasonMapper.fromEntityToDTO(result);
  }

  async update(
    vehicleStatChangeSubReasonEntityDTO: VehicleStatChangeSubReasonDTO,
    updater?: string
  ): Promise<VehicleStatChangeSubReasonDTO | undefined> {
    const entity = VehicleStatChangeSubReasonMapper.fromDTOtoEntity(vehicleStatChangeSubReasonEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleStatChangeSubReasonEntityRepository.save(entity);
    return VehicleStatChangeSubReasonMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleStatChangeSubReasonEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
