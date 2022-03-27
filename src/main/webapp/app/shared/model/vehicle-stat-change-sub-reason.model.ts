import { IVehicleStatusChangeReason } from 'app/shared/model/vehicle-status-change-reason.model';

export interface IVehicleStatChangeSubReason {
  id?: number;
  code?: string;
  displayName?: string;
  description?: string | null;
  vehicleStatusChangeReason?: IVehicleStatusChangeReason | null;
}

export const defaultValue: Readonly<IVehicleStatChangeSubReason> = {};
