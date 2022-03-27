/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleMovementDTO } from './vehicle-movement.dto';
import { VehicleMovementHistoryDTO } from './vehicle-movement-history.dto';
import { VehicleMovementChecklistStatus } from '../../domain/enumeration/vehicle-movement-checklist-status';

/**
 * A VehicleMovementChecklistDTO object.
 */
export class VehicleMovementChecklistDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ enum: VehicleMovementChecklistStatus, description: 'itemStatus enum field' })
  itemStatus: VehicleMovementChecklistStatus;

  @ApiModelProperty({ type: VehicleMovementDTO, description: 'vehicleMovement relationship' })
  vehicleMovement: VehicleMovementDTO;

  @ApiModelProperty({ type: VehicleMovementHistoryDTO, description: 'vehicleMovementHistory relationship' })
  vehicleMovementHistory: VehicleMovementHistoryDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
