import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SimNetworkDTO } from '../service/dto/sim-network.dto';
import { SimNetworkMapper } from '../service/mapper/sim-network.mapper';
import { SimNetworkRepository } from '../repository/sim-network.repository';

const relationshipNames = [];

@Injectable()
export class SimNetworkService {
  logger = new Logger('SimNetworkService');

  constructor(@InjectRepository(SimNetworkRepository) private simNetworkEntityRepository: SimNetworkRepository) {}

  async findById(id: number): Promise<SimNetworkDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.simNetworkEntityRepository.findOne(id, options);
    return SimNetworkMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<SimNetworkDTO>): Promise<SimNetworkDTO | undefined> {
    const result = await this.simNetworkEntityRepository.findOne(options);
    return SimNetworkMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<SimNetworkDTO>): Promise<[SimNetworkDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.simNetworkEntityRepository.findAndCount(options);
    const simNetworkEntityDTO: SimNetworkDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(simNetworkEntity => simNetworkEntityDTO.push(SimNetworkMapper.fromEntityToDTO(simNetworkEntity)));
      resultList[0] = simNetworkEntityDTO;
    }
    return resultList;
  }

  async save(simNetworkEntityDTO: SimNetworkDTO, creator?: string): Promise<SimNetworkDTO | undefined> {
    const entity = SimNetworkMapper.fromDTOtoEntity(simNetworkEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.simNetworkEntityRepository.save(entity);
    return SimNetworkMapper.fromEntityToDTO(result);
  }

  async update(simNetworkEntityDTO: SimNetworkDTO, updater?: string): Promise<SimNetworkDTO | undefined> {
    const entity = SimNetworkMapper.fromDTOtoEntity(simNetworkEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.simNetworkEntityRepository.save(entity);
    return SimNetworkMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.simNetworkEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
