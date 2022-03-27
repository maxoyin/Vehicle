import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { VehicleMovementChecklistStatus } from 'app/shared/model/enumerations/vehicle-movement-checklist-status.model';

export interface IVehicleMovementChecklist {
  id?: number;
  itemStatus?: VehicleMovementChecklistStatus;
  vehicleMovement?: IVehicleMovement | null;
  vehicleMovementHistory?: IVehicleMovementHistory | null;
}

export const defaultValue: Readonly<IVehicleMovementChecklist> = {};
