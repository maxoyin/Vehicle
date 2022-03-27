/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleMovementEntity } from './vehicle-movement.entity';
import { VehicleMovementHistoryEntity } from './vehicle-movement-history.entity';
import { VehicleTrimEntity } from './vehicle-trim.entity';
import { VehicleStatusEntity } from './vehicle-status.entity';

/**
 * Rework might be needed. Relationship - hPV
 */
@Entity('vehicle')
export class VehicleEntity extends BaseEntity {
  /**
   * Unique system generated user readable value. E.g. MAX-VH-IB-123
   */

  @Column({ name: 'max_vehicle_id' })
  maxVehicleId: string;

  /**
   * Shared resource: From config service
   */

  @Column({ name: 'sub_city_id' })
  subCityId: string;

  @Column({ name: 'chassis_number' })
  chassisNumber: string;

  @Column({ name: 'ignition_number' })
  ignitionNumber: string;

  @Column({ name: 'engine_number' })
  engineNumber: string;

  @Column({ name: 'vehicle_color' })
  vehicleColor: string;

  @Column({ name: 'oem_vendor_name' })
  oemVendorName: string;

  @Column({ name: 'receiver' })
  receiver: string;

  /**
   * Shared resource: From config service. Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ name: 'service_type_code', nullable: true })
  serviceTypeCode: string;

  /**
   * Shared resource: From account service. Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ name: 'partner_code', nullable: true })
  partnerCode: string;

  /**
   * Shared resource: From config service. Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ name: 'platform_code', nullable: true })
  platformCode: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ name: 'plate_number', nullable: true })
  plateNumber: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ type: 'date', name: 'license_expiration_date', nullable: true })
  licenseExpirationDate: any;

  /**
   * Mandatory value once vehicle is priced.
   */
  @Column({ name: 'pricing_template_id', nullable: true })
  pricingTemplateId: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ name: 'device_imei', nullable: true })
  deviceImei: string;

  /**
   * Mandatory value once vehicle is ready to be assigned.
   */
  @Column({ name: 'sim_serial_number', nullable: true })
  simSerialNumber: string;

  /**
   * Mandatory value once vehicle is ready to be assigned. Tracker Sim no
   */
  @Column({ name: 'device_phone', nullable: true })
  devicePhone: string;

  /**
   * Usecase and value source unknown
   */
  @Column({ type: 'integer', name: 'batch_id', nullable: true })
  batchId: number;

  /**
   * Usecase and value source unknown
   */
  @Column({ type: 'boolean', name: 'is_max_vehicle', nullable: true })
  isMaxVehicle: boolean;

  /**
   * Usecase and value source unknown
   */
  @Column({ name: 'max_global_id', nullable: true })
  maxGlobalId: string;

  @OneToOne(type => VehicleMovementEntity)
  @JoinColumn()
  vehicleMovement: VehicleMovementEntity;

  @OneToOne(type => VehicleMovementHistoryEntity)
  @JoinColumn()
  vehicleMovementHistory: VehicleMovementHistoryEntity;

  @ManyToOne(type => VehicleTrimEntity)
  vehicleTrim: VehicleTrimEntity;

  @ManyToOne(type => VehicleStatusEntity)
  vehicleStatus: VehicleStatusEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
