import { EntityRepository, Repository } from 'typeorm';
import { VehicleTypeEntity } from '../domain/vehicle-type.entity';

@EntityRepository(VehicleTypeEntity)
export class VehicleTypeRepository extends Repository<VehicleTypeEntity> {}
