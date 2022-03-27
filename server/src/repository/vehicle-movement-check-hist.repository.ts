import { EntityRepository, Repository } from 'typeorm';
import { VehicleMovementCheckHistEntity } from '../domain/vehicle-movement-check-hist.entity';

@EntityRepository(VehicleMovementCheckHistEntity)
export class VehicleMovementCheckHistRepository extends Repository<VehicleMovementCheckHistEntity> {}
