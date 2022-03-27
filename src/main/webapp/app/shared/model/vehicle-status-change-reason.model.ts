import { IVehicleStatChangeSubReason } from 'app/shared/model/vehicle-stat-change-sub-reason.model';
import { IVehicleStatus } from 'app/shared/model/vehicle-status.model';

export interface IVehicleStatusChangeReason {
  id?: number;
  code?: string;
  displayName?: string;
  description?: string | null;
  vehicleStatChangeSubReasons?: IVehicleStatChangeSubReason[] | null;
  vehicleStatus?: IVehicleStatus | null;
}

export const defaultValue: Readonly<IVehicleStatusChangeReason> = {};
