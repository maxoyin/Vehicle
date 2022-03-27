import { EntityRepository, Repository } from 'typeorm';
import { VehicleMovementHistoryEntity } from '../domain/vehicle-movement-history.entity';

@EntityRepository(VehicleMovementHistoryEntity)
export class VehicleMovementHistoryRepository extends Repository<VehicleMovementHistoryEntity> {}
