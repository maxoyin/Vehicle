/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A SimNetworkDTO object.
 */
export class SimNetworkDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiModelProperty({ description: 'code field' })
  code: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'displayName field' })
  displayName: string;

  @ApiModelProperty({ description: 'description field', required: false })
  description: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
