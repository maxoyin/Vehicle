/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleMovementChecklistStatus } from '../../domain/enumeration/vehicle-movement-checklist-status';

/**
 * A VehicleMovementCheckHistDTO object.
 */
export class VehicleMovementCheckHistDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ enum: VehicleMovementChecklistStatus, description: 'itemStatus enum field' })
  itemStatus: VehicleMovementChecklistStatus;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
