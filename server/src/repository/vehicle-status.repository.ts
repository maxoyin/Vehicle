import { EntityRepository, Repository } from 'typeorm';
import { VehicleStatusEntity } from '../domain/vehicle-status.entity';

@EntityRepository(VehicleStatusEntity)
export class VehicleStatusRepository extends Repository<VehicleStatusEntity> {}
