import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { VehicleMovementCheckHistDTO } from '../service/dto/vehicle-movement-check-hist.dto';
import { VehicleMovementCheckHistMapper } from '../service/mapper/vehicle-movement-check-hist.mapper';
import { VehicleMovementCheckHistRepository } from '../repository/vehicle-movement-check-hist.repository';

const relationshipNames = [];

@Injectable()
export class VehicleMovementCheckHistService {
  logger = new Logger('VehicleMovementCheckHistService');

  constructor(
    @InjectRepository(VehicleMovementCheckHistRepository)
    private vehicleMovementCheckHistEntityRepository: VehicleMovementCheckHistRepository
  ) {}

  async findById(id: number): Promise<VehicleMovementCheckHistDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.vehicleMovementCheckHistEntityRepository.findOne(id, options);
    return VehicleMovementCheckHistMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<VehicleMovementCheckHistDTO>): Promise<VehicleMovementCheckHistDTO | undefined> {
    const result = await this.vehicleMovementCheckHistEntityRepository.findOne(options);
    return VehicleMovementCheckHistMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<VehicleMovementCheckHistDTO>): Promise<[VehicleMovementCheckHistDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.vehicleMovementCheckHistEntityRepository.findAndCount(options);
    const vehicleMovementCheckHistEntityDTO: VehicleMovementCheckHistDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(vehicleMovementCheckHistEntity =>
        vehicleMovementCheckHistEntityDTO.push(VehicleMovementCheckHistMapper.fromEntityToDTO(vehicleMovementCheckHistEntity))
      );
      resultList[0] = vehicleMovementCheckHistEntityDTO;
    }
    return resultList;
  }

  async save(
    vehicleMovementCheckHistEntityDTO: VehicleMovementCheckHistDTO,
    creator?: string
  ): Promise<VehicleMovementCheckHistDTO | undefined> {
    const entity = VehicleMovementCheckHistMapper.fromDTOtoEntity(vehicleMovementCheckHistEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.vehicleMovementCheckHistEntityRepository.save(entity);
    return VehicleMovementCheckHistMapper.fromEntityToDTO(result);
  }

  async update(
    vehicleMovementCheckHistEntityDTO: VehicleMovementCheckHistDTO,
    updater?: string
  ): Promise<VehicleMovementCheckHistDTO | undefined> {
    const entity = VehicleMovementCheckHistMapper.fromDTOtoEntity(vehicleMovementCheckHistEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.vehicleMovementCheckHistEntityRepository.save(entity);
    return VehicleMovementCheckHistMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.vehicleMovementCheckHistEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
