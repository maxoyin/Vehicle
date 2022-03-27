import { IVehicle } from 'app/shared/model/vehicle.model';
import { IVehicleMovementChecklist } from 'app/shared/model/vehicle-movement-checklist.model';
import { IVehicleMovementHistory } from 'app/shared/model/vehicle-movement-history.model';
import { MovementType } from 'app/shared/model/enumerations/movement-type.model';

export interface IVehicleMovement {
  id?: number;
  sourceSubCityId?: string;
  destinationSubCityId?: string | null;
  movementType?: MovementType;
  retrievalAgentMaxId?: string;
  odometerReadingOutward?: number;
  odometerReadingInward?: number | null;
  vehicle?: IVehicle | null;
  vehicleMovementChecklists?: IVehicleMovementChecklist[] | null;
  vehicleMovementHistories?: IVehicleMovementHistory[] | null;
  vehicle?: IVehicle | null;
}

export const defaultValue: Readonly<IVehicleMovement> = {};
