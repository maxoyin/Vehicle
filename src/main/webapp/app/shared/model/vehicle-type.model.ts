import { IVehicleModel } from 'app/shared/model/vehicle-model.model';
import { IAssestClass } from 'app/shared/model/assest-class.model';

export interface IVehicleType {
  id?: number;
  code?: string;
  displayName?: string;
  isDisplayOn?: boolean;
  description?: string | null;
  vehicleModels?: IVehicleModel[] | null;
  assestClass?: IAssestClass | null;
}

export const defaultValue: Readonly<IVehicleType> = {
  isDisplayOn: false,
};
