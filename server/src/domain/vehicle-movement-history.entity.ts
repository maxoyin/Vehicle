/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleEntity } from './vehicle.entity';
import { VehicleMovementChecklistEntity } from './vehicle-movement-checklist.entity';
import { VehicleMovementEntity } from './vehicle-movement.entity';
import { MovementType } from './enumeration/movement-type';

/**
 * Relationship - Vehicle, VehicleMovement, VehicleStatChangeSubReason. History table for VehicleMovement. Only trigger need to be created on VehicleMovement to insert here
 */
@Entity('vehicle_movement_history')
export class VehicleMovementHistoryEntity extends BaseEntity {
  /**
   * Current location field from UI
   */

  @Column({ name: 'source_sub_city_id' })
  sourceSubCityId: string;

  @Column({ name: 'destination_sub_city_id', nullable: true })
  destinationSubCityId: string;

  /**
   * This field identifies whether vehicle is checked-in (Entry) or checkout out (Exit)
   */

  @Column({ type: 'simple-enum', name: 'movement_type', enum: MovementType })
  movementType: MovementType;

  @Column({ name: 'retrival_agent_max_id' })
  retrivalAgentMaxId: string;

  /**
   * Odomoter reading when at source
   */

  @Column({ type: 'double', name: 'odometer_reading_outward' })
  odometerReadingOutward: number;

  /**
   * Odomoter reading when received at destination
   */
  @Column({ type: 'double', name: 'odometer_reading_inward', nullable: true })
  odometerReadingInward: number;

  @OneToOne(type => VehicleEntity)
  @JoinColumn()
  vehicle: VehicleEntity;

  @OneToMany(type => VehicleMovementChecklistEntity, other => other.vehicleMovementHistory)
  vehicleMovementChecklists: VehicleMovementChecklistEntity[];

  @ManyToOne(type => VehicleMovementEntity)
  vehicleMovement: VehicleMovementEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
