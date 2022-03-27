import { IVehicleStatusChangeReason } from 'app/shared/model/vehicle-status-change-reason.model';
import { IVehicle } from 'app/shared/model/vehicle.model';

export interface IVehicleStatus {
  id?: number;
  code?: string;
  displayName?: string;
  description?: string | null;
  vehicleStatusChangeReasons?: IVehicleStatusChangeReason[] | null;
  vehicles?: IVehicle[] | null;
}

export const defaultValue: Readonly<IVehicleStatus> = {};
