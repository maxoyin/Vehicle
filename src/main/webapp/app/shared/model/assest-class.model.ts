import { IVehicleType } from 'app/shared/model/vehicle-type.model';

export interface IAssestClass {
  id?: number;
  code?: string;
  displayName?: string;
  isDisplayOn?: boolean;
  description?: string | null;
  vehicleTypes?: IVehicleType[] | null;
}

export const defaultValue: Readonly<IAssestClass> = {
  isDisplayOn: false,
};
