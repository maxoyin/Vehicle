import { EntityRepository, Repository } from 'typeorm';
import { VehicleMovementEntity } from '../domain/vehicle-movement.entity';

@EntityRepository(VehicleMovementEntity)
export class VehicleMovementRepository extends Repository<VehicleMovementEntity> {}
