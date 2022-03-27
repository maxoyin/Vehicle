/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { VehicleMovementDTO } from './vehicle-movement.dto';
import { VehicleMovementHistoryDTO } from './vehicle-movement-history.dto';
import { VehicleTrimDTO } from './vehicle-trim.dto';
import { VehicleStatusDTO } from './vehicle-status.dto';

/**
 * A VehicleDTO object.
 */
export class VehicleDTO extends BaseDTO {
  /**
   * Unique system generated user readable value. E.g. MAX-VH-IB-123
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Unique system generated user readable value. E.g. MAX-VH-IB-123' })
  maxVehicleId: string;

  /**
   * Shared resource: From config service
   */
  @IsNotEmpty()
  @ApiModelProperty({ description: 'Shared resource: From config service' })
  subCityId: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'chassisNumber field' })
  chassisNumber: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'ignitionNumber field' })
  ignitionNumber: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'engineNumber field' })
  engineNumber: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'vehicleColor field' })
  vehicleColor: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'oemVendorName field' })
  oemVendorName: string;

  @IsNotEmpty()
  @ApiModelProperty({ description: 'receiver field' })
  receiver: string;

  /**
   * Shared resource: From config service. Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({
    description: 'Shared resource: From config service. Mandatory value once vehicle is ready to be assigned.',
    required: false,
  })
  serviceTypeCode: string;

  /**
   * Shared resource: From account service. Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({
    description: 'Shared resource: From account service. Mandatory value once vehicle is ready to be assigned.',
    required: false,
  })
  partnerCode: string;

  /**
   * Shared resource: From config service. Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({
    description: 'Shared resource: From config service. Mandatory value once vehicle is ready to be assigned.',
    required: false,
  })
  platformCode: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({ description: 'Mandatory value once vehicle is ready to be assigned.', required: false })
  plateNumber: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({ description: 'Mandatory value once vehicle is ready to be assigned.', required: false })
  licenseExpirationDate: any;

  /**
   * Mandatory value once vehicle is priced.
   */
  @ApiModelProperty({ description: 'Mandatory value once vehicle is priced.', required: false })
  pricingTemplateId: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({ description: 'Mandatory value once vehicle is ready to be assigned.', required: false })
  deviceImei: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @ApiModelProperty({ description: 'Mandatory value once vehicle is ready to be assigned.', required: false })
  simSerialNumber: string;

  /**
   * Mandatory value once vehicle is ready to be assigned. Tracker Sim no
   */
  @ApiModelProperty({ description: 'Mandatory value once vehicle is ready to be assigned. Tracker Sim no', required: false })
  devicePhone: string;

  /**
   * Usecase and value source unknown
   */
  @ApiModelProperty({ description: 'Usecase and value source unknown', required: false })
  batchId: number;

  /**
   * Usecase and value source unknown
   */
  @ApiModelProperty({ description: 'Usecase and value source unknown', required: false })
  isMaxVehicle: boolean;

  /**
   * Usecase and value source unknown
   */
  @ApiModelProperty({ description: 'Usecase and value source unknown', required: false })
  maxGlobalId: string;

  @ApiModelProperty({ type: VehicleMovementDTO, description: 'vehicleMovement relationship' })
  vehicleMovement: VehicleMovementDTO;

  @ApiModelProperty({ type: VehicleMovementHistoryDTO, description: 'vehicleMovementHistory relationship' })
  vehicleMovementHistory: VehicleMovementHistoryDTO;

  @ApiModelProperty({ type: VehicleTrimDTO, description: 'vehicleTrim relationship' })
  vehicleTrim: VehicleTrimDTO;

  @ApiModelProperty({ type: VehicleStatusDTO, description: 'vehicleStatus relationship' })
  vehicleStatus: VehicleStatusDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
