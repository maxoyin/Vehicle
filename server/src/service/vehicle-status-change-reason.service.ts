import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleStatusChangeReasonDTO } from '../service/dto/vehicle-status-change-reason.dto';
import { VehicleStatusChangeReasonMapper } from '../service/mapper/vehicle-status-change-reason.mapper';
import { VehicleStatusChangeReasonRepository } from '../repository/vehicle-status-change-reason.repository';

const relationshipNames = [];
relationshipNames.push('vehicleStatus');

@Injectable()
export class VehicleStatusChangeReasonService {
  logger = new Logger('VehicleStatusChangeReasonService');

  constructor(
    @InjectRepository(VehicleStatusChangeReasonRepository)
    private vehicleStatusChangeReasonEntityRepository: VehicleStatusChangeReasonRepository
  ) {}

  async findById(id: number): Promise<VehicleStatusChangeReasonDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleStatusChangeReasonEntityRepository.findOne(id, options);
    return VehicleStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleStatusChangeReasonDTO>): Promise<VehicleStatusChangeReasonDTO | undefined> {
    const result = await this.vehicleStatusChangeReasonEntityRepository.findOne(options);
    return VehicleStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleStatusChangeReasonDTO>): Promise<[VehicleStatusChangeReasonDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleStatusChangeReasonEntityRepository.findAndCount(options);
    const vehicleStatusChangeReasonEntityDTO: VehicleStatusChangeReasonDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleStatusChangeReasonEntity =>
        vehicleStatusChangeReasonEntityDTO.push(VehicleStatusChangeReasonMapper.fromEntityToDTO(vehicleStatusChangeReasonEntity))
      );
      resultList[0] = vehicleStatusChangeReasonEntityDTO;
    }
    return resultList;
  }

  async save(
    vehicleStatusChangeReasonEntityDTO: VehicleStatusChangeReasonDTO,
    creator?: string
  ): Promise<VehicleStatusChangeReasonDTO | undefined> {
    const entity = VehicleStatusChangeReasonMapper.fromDTOtoEntity(vehicleStatusChangeReasonEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleStatusChangeReasonEntityRepository.save(entity);
    return VehicleStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async update(
    vehicleStatusChangeReasonEntityDTO: VehicleStatusChangeReasonDTO,
    updater?: string
  ): Promise<VehicleStatusChangeReasonDTO | undefined> {
    const entity = VehicleStatusChangeReasonMapper.fromDTOtoEntity(vehicleStatusChangeReasonEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleStatusChangeReasonEntityRepository.save(entity);
    return VehicleStatusChangeReasonMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleStatusChangeReasonEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
