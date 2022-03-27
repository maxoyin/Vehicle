import { EntityRepository, Repository } from 'typeorm';
import { VehicleTrimEntity } from '../domain/vehicle-trim.entity';

@EntityRepository(VehicleTrimEntity)
export class VehicleTrimRepository extends Repository<VehicleTrimEntity> {}
