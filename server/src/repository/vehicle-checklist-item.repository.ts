import { EntityRepository, Repository } from 'typeorm';
import { VehicleChecklistItemEntity } from '../domain/vehicle-checklist-item.entity';

@EntityRepository(VehicleChecklistItemEntity)
export class VehicleChecklistItemRepository extends Repository<VehicleChecklistItemEntity> {}
