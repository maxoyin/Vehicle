import { IVehicleModel } from 'app/shared/model/vehicle-model.model';

export interface IVehicleManufacturer {
  id?: number;
  code?: string;
  displayName?: string;
  isDisplayOn?: boolean;
  description?: string | null;
  vehicleModels?: IVehicleModel[] | null;
}

export const defaultValue: Readonly<IVehicleManufacturer> = {
  isDisplayOn: false,
};
