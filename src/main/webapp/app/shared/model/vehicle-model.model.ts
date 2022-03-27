import dayjs from 'dayjs';
import { IVehicleTrim } from 'app/shared/model/vehicle-trim.model';
import { IVehicleManufacturer } from 'app/shared/model/vehicle-manufacturer.model';
import { IVehicleType } from 'app/shared/model/vehicle-type.model';

export interface IVehicleModel {
  id?: number;
  code?: string;
  displayName?: string;
  isDisplayOn?: boolean;
  modelYear?: string | null;
  description?: string | null;
  vehicleTrims?: IVehicleTrim[] | null;
  vehicleManufacturer?: IVehicleManufacturer | null;
  vehicleType?: IVehicleType | null;
}

export const defaultValue: Readonly<IVehicleModel> = {
  isDisplayOn: false,
};
