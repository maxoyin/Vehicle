/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleStatusChangeReasonEntity } from './vehicle-status-change-reason.entity';

/**
 * Create relationship to VehicleStatusChangeReason.
 */
@Entity('vehicle_stat_change_sub_reason')
export class VehicleStatChangeSubReasonEntity extends BaseEntity {
  /**
   * unique human readable name. Such as pulsar_xvi
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

  @ManyToOne(type => VehicleStatusChangeReasonEntity)
  vehicleStatusChangeReason: VehicleStatusChangeReasonEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
