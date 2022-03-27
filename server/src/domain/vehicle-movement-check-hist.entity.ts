/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleMovementChecklistStatus } from './enumeration/vehicle-movement-checklist-status';

/**
 * Relationship - VehicleMovement, VehicleChecklist, VehicleMovementChecklist. History table for VehicleMovementChecklist. Only trigger need to be created on VehicleMovementChecklist to insert here
 */
@Entity('vehicle_movement_check_hist')
export class VehicleMovementCheckHistEntity extends BaseEntity {
  @Column({ type: 'simple-enum', name: 'item_status', enum: VehicleMovementChecklistStatus })
  itemStatus: VehicleMovementChecklistStatus;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
