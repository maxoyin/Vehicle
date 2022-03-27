import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AssestClassDTO } from '../service/dto/assest-class.dto';
import { AssestClassMapper } from '../service/mapper/assest-class.mapper';
import { AssestClassRepository } from '../repository/assest-class.repository';

const relationshipNames = [];

@Injectable()
export class AssestClassService {
  logger = new Logger('AssestClassService');

  constructor(@InjectRepository(AssestClassRepository) private assestClassEntityRepository: AssestClassRepository) {}

  async findById(id: number): Promise<AssestClassDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.assestClassEntityRepository.findOne(id, options);
    return AssestClassMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<AssestClassDTO>): Promise<AssestClassDTO | undefined> {
    const result = await this.assestClassEntityRepository.findOne(options);
    return AssestClassMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<AssestClassDTO>): Promise<[AssestClassDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.assestClassEntityRepository.findAndCount(options);
    const assestClassEntityDTO: AssestClassDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(assestClassEntity => assestClassEntityDTO.push(AssestClassMapper.fromEntityToDTO(assestClassEntity)));
      resultList[0] = assestClassEntityDTO;
    }
    return resultList;
  }

  async save(assestClassEntityDTO: AssestClassDTO, creator?: string): Promise<AssestClassDTO | undefined> {
    const entity = AssestClassMapper.fromDTOtoEntity(assestClassEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.assestClassEntityRepository.save(entity);
    return AssestClassMapper.fromEntityToDTO(result);
  }

  async update(assestClassEntityDTO: AssestClassDTO, updater?: string): Promise<AssestClassDTO | undefined> {
    const entity = AssestClassMapper.fromDTOtoEntity(assestClassEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.assestClassEntityRepository.save(entity);
    return AssestClassMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.assestClassEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
