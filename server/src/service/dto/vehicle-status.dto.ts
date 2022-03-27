/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleStatusChangeReasonDTO } from './vehicle-status-change-reason.dto';
import { VehicleDTO } from './vehicle.dto';

/**
 * A VehicleStatusDTO object.
 */
export class VehicleStatusDTO extends BaseDTO {
  /**
   * unique human readable name.
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'unique human readable name.' })
  code: string;

  /**
   * This stores the name that will be shown in the UI
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'This stores the name that will be shown in the UI' })
  displayName: string;

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  @ApiModelProperty({ type: VehicleStatusChangeReasonDTO, isArray: true, description: 'vehicleStatusChangeReasons relationship' })
  vehicleStatusChangeReasons: VehicleStatusChangeReasonDTO[];

  @ApiModelProperty({ type: VehicleDTO, isArray: true, description: 'vehicles relationship' })
  vehicles: VehicleDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
