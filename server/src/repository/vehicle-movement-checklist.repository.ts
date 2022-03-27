import { EntityRepository, Repository } from 'typeorm';
import { VehicleMovementChecklistEntity } from '../domain/vehicle-movement-checklist.entity';

@EntityRepository(VehicleMovementChecklistEntity)
export class VehicleMovementChecklistRepository extends Repository<VehicleMovementChecklistEntity> {}
