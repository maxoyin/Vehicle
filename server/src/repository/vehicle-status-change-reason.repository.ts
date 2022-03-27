import { EntityRepository, Repository } from 'typeorm';
import { VehicleStatusChangeReasonEntity } from '../domain/vehicle-status-change-reason.entity';

@EntityRepository(VehicleStatusChangeReasonEntity)
export class VehicleStatusChangeReasonRepository extends Repository<VehicleStatusChangeReasonEntity> {}
