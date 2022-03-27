import dayjs from 'dayjs';
import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { IVehicleTrim } from 'app/shared/model/vehicle-trim.model';
import { IVehicleStatus } from 'app/shared/model/vehicle-status.model';

export interface IVehicle {
  id?: number;
  maxVehicleId?: string;
  subCityId?: string;
  chassisNumber?: string;
  ignitionNumber?: string;
  engineNumber?: string;
  vehicleColor?: string;
  oemVendorName?: string;
  receiver?: string;
  serviceTypeCode?: string | null;
  partnerCode?: string | null;
  platformCode?: string | null;
  plateNumber?: string | null;
  licenseExpirationDate?: string | null;
  pricingTemplateId?: string | null;
  deviceImei?: string | null;
  simSerialNumber?: string | null;
  devicePhone?: string | null;
  batchId?: number | null;
  isMaxVehicle?: boolean | null;
  maxGlobalId?: string | null;
  vehicleMovement?: IVehicleMovement | null;
  vehicleMovementHistory?: IVehicleMovementHistory | null;
  vehicleMovement?: IVehicleMovement | null;
  vehicleMovementHistory?: IVehicleMovementHistory | null;
  vehicleTrim?: IVehicleTrim | null;
  vehicleStatus?: IVehicleStatus | null;
}

export const defaultValue: Readonly<IVehicle> = {
  isMaxVehicle: false,
};
