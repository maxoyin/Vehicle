/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleTrimDTO } from './vehicle-trim.dto';
import { VehicleManufacturerDTO } from './vehicle-manufacturer.dto';
import { VehicleTypeDTO } from './vehicle-type.dto';

/**
 * A VehicleModelDTO object.
 */
export class VehicleModelDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'code field' })
  code: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'displayName field' })
  displayName: string;

  /**
   * This identifies whether to show it in our application or not.
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'This identifies whether to show it in our application or not.' })
  isDisplayOn: boolean;

  @ApiModelProperty({ description: 'modelYear field', required: false })
  modelYear: any;

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  @ApiModelProperty({ type: VehicleTrimDTO, isArray: true, description: 'vehicleTrims relationship' })
  vehicleTrims: VehicleTrimDTO[];

  @ApiModelProperty({ type: VehicleManufacturerDTO, description: 'vehicleManufacturer relationship' })
  vehicleManufacturer: VehicleManufacturerDTO;

  @ApiModelProperty({ type: VehicleTypeDTO, description: 'vehicleType relationship' })
  vehicleType: VehicleTypeDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
