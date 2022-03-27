/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleMovementEntity } from './vehicle-movement.entity';
import { VehicleMovementHistoryEntity } from './vehicle-movement-history.entity';
import { VehicleMovementChecklistStatus } from './enumeration/vehicle-movement-checklist-status';

/**
 * Relationship - VehicleMovement, VehicleChecklistItem. This table stores the items given to champion while checking out vehicle. It also manages the status, if item is retrieved or still with the champion
 */
@Entity('vehicle_movement_checklist')
export class VehicleMovementChecklistEntity extends BaseEntity {
  @Column({ type: 'simple-enum', name: 'item_status', enum: VehicleMovementChecklistStatus })
  itemStatus: VehicleMovementChecklistStatus;

  @ManyToOne(type => VehicleMovementEntity)
  vehicleMovement: VehicleMovementEntity;

  @ManyToOne(type => VehicleMovementHistoryEntity)
  vehicleMovementHistory: VehicleMovementHistoryEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
