import { EntityRepository, Repository } from 'typeorm';
import { VehicleModelEntity } from '../domain/vehicle-model.entity';

@EntityRepository(VehicleModelEntity)
export class VehicleModelRepository extends Repository<VehicleModelEntity> {}
