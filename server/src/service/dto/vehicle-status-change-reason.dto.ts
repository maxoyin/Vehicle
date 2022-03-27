/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleStatChangeSubReasonDTO } from './vehicle-stat-change-sub-reason.dto';
import { VehicleStatusDTO } from './vehicle-status.dto';

/**
 * A VehicleStatusChangeReasonDTO object.
 */
export class VehicleStatusChangeReasonDTO extends BaseDTO {
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

  @ApiModelProperty({ type: VehicleStatChangeSubReasonDTO, isArray: true, description: 'vehicleStatChangeSubReasons relationship' })
  vehicleStatChangeSubReasons: VehicleStatChangeSubReasonDTO[];

  @ApiModelProperty({ type: VehicleStatusDTO, description: 'vehicleStatus relationship' })
  vehicleStatus: VehicleStatusDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
