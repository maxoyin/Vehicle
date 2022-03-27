import { EntityRepository, Repository } from 'typeorm';
import { VehicleManufacturerEntity } from '../domain/vehicle-manufacturer.entity';

@EntityRepository(VehicleManufacturerEntity)
export class VehicleManufacturerRepository extends Repository<VehicleManufacturerEntity> {}
