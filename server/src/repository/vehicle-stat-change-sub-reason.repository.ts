import { EntityRepository, Repository } from 'typeorm';
import { VehicleStatChangeSubReasonEntity } from '../domain/vehicle-stat-change-sub-reason.entity';

@EntityRepository(VehicleStatChangeSubReasonEntity)
export class VehicleStatChangeSubReasonRepository extends Repository<VehicleStatChangeSubReasonEntity> {}
