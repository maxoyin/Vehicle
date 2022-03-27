/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleDTO } from './vehicle.dto';
import { VehicleModelDTO } from './vehicle-model.dto';

/**
 * A VehicleTrimDTO object.
 */
export class VehicleTrimDTO extends BaseDTO {
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

  /**
   * This identifies whether to show it in our application or not.
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'This identifies whether to show it in our application or not.' })
  isDisplayOn: boolean;

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  @ApiModelProperty({ type: VehicleDTO, isArray: true, description: 'vehicles relationship' })
  vehicles: VehicleDTO[];

  @ApiModelProperty({ type: VehicleModelDTO, description: 'vehicleModel relationship' })
  vehicleModel: VehicleModelDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
