import { IVehicle } from 'app/shared/model/vehicle.model';
import { IVehicleModel } from 'app/shared/model/vehicle-model.model';

export interface IVehicleTrim {
  id?: number;
  code?: string;
  displayName?: string;
  isDisplayOn?: boolean;
  description?: string | null;
  vehicles?: IVehicle[] | null;
  vehicleModel?: IVehicleModel | null;
}

export const defaultValue: Readonly<IVehicleTrim> = {
  isDisplayOn: false,
};
