/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleDTO } from './vehicle.dto';
import { VehicleMovementChecklistDTO } from './vehicle-movement-checklist.dto';
import { VehicleMovementDTO } from './vehicle-movement.dto';
import { MovementType } from '../../domain/enumeration/movement-type';

/**
 * A VehicleMovementHistoryDTO object.
 */
export class VehicleMovementHistoryDTO extends BaseDTO {
  /**
   * Current location field from UI
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Current location field from UI' })
  sourceSubCityId: string;

  @ApiModelProperty({ description: 'destinationSubCityId field', required: false })
  destinationSubCityId: string;

  /**
   * This field identifies whether vehicle is checked-in (Entry) or checkout out (Exit)
   */
  @IsNotEmpty()
  @ApiModelProperty({
    enum: MovementType,
    description: 'This field identifies whether vehicle is checked-in (Entry) or checkout out (Exit)',
  })
  movementType: MovementType;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'retrivalAgentMaxId field' })
  retrivalAgentMaxId: string;

  /**
   * Odomoter reading when at source
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Odomoter reading when at source' })
  odometerReadingOutward: number;

  /**
   * Odomoter reading when received at destination
   */
  @ApiModelProperty({ description: 'Odomoter reading when received at destination', required: false })
  odometerReadingInward: number;

  @ApiModelProperty({ type: VehicleDTO, description: 'vehicle relationship' })
  vehicle: VehicleDTO;

  @ApiModelProperty({ type: VehicleMovementChecklistDTO, isArray: true, description: 'vehicleMovementChecklists relationship' })
  vehicleMovementChecklists: VehicleMovementChecklistDTO[];

  @ApiModelProperty({ type: VehicleMovementDTO, description: 'vehicleMovement relationship' })
  vehicleMovement: VehicleMovementDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
