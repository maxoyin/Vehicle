import { IVehicle } from 'app/shared/model/vehicle.model';
import { IVehicleMovementChecklist } from 'app/shared/model/vehicle-movement-checklist.model';
import { IVehicleMovement } from 'app/shared/model/vehicle-movement.model';
import { MovementType } from 'app/shared/model/enumerations/movement-type.model';

export interface IVehicleMovementHistory {
  id?: number;
  sourceSubCityId?: string;
  destinationSubCityId?: string | null;
  movementType?: MovementType;
  retrivalAgentMaxId?: string;
  odometerReadingOutward?: number;
  odometerReadingInward?: number | null;
  vehicle?: IVehicle | null;
  vehicleMovementChecklists?: IVehicleMovementChecklist[] | null;
  vehicle?: IVehicle | null;
  vehicleMovement?: IVehicleMovement | null;
}

export const defaultValue: Readonly<IVehicleMovementHistory> = {};
