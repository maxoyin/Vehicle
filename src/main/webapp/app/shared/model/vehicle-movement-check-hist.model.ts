import { VehicleMovementChecklistStatus } from 'app/shared/model/enumerations/vehicle-movement-checklist-status.model';

export interface IVehicleMovementCheckHist {
  id?: number;
  itemStatus?: VehicleMovementChecklistStatus;
}

export const defaultValue: Readonly<IVehicleMovementCheckHist> = {};
