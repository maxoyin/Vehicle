/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleStatChangeSubReasonEntity } from './vehicle-stat-change-sub-reason.entity';
import { VehicleStatusEntity } from './vehicle-status.entity';

/**
 * Create relationship to VehicleStatus.
 */
@Entity('vehicle_status_change_reason')
export class VehicleStatusChangeReasonEntity extends BaseEntity {
  /**
   * unique human readable name.
   */

  @Column({ name: 'code' })
  code: string;

  /**
   * This stores the name that will be shown in the UI
   */

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(type => VehicleStatChangeSubReasonEntity, other => other.vehicleStatusChangeReason)
  vehicleStatChangeSubReasons: VehicleStatChangeSubReasonEntity[];

  @ManyToOne(type => VehicleStatusEntity)
  vehicleStatus: VehicleStatusEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
