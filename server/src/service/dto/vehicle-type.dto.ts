/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleModelDTO } from './vehicle-model.dto';
import { AssestClassDTO } from './assest-class.dto';

/**
 * A VehicleTypeDTO object.
 */
export class VehicleTypeDTO extends BaseDTO {
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

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  @ApiModelProperty({ type: VehicleModelDTO, isArray: true, description: 'vehicleModels relationship' })
  vehicleModels: VehicleModelDTO[];

  @ApiModelProperty({ type: AssestClassDTO, description: 'assestClass relationship' })
  assestClass: AssestClassDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
