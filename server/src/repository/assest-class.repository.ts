import { EntityRepository, Repository } from 'typeorm';
import { AssestClassEntity } from '../domain/assest-class.entity';

@EntityRepository(AssestClassEntity)
export class AssestClassRepository extends Repository<AssestClassEntity> {}
