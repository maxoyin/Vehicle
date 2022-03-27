/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A VehicleChecklistItemDTO object.
 */
export class VehicleChecklistItemDTO extends BaseDTO {
  /**
   * unique human readable name. Such as helmet
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'unique human readable name. Such as helmet' })
  code: string;

  /**
   * This stores the name that will be shown in the UI
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'This stores the name that will be shown in the UI' })
  displayName: string;

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
