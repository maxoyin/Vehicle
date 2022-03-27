/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleStatusChangeReasonEntity } from './vehicle-status-change-reason.entity';
import { VehicleEntity } from './vehicle.entity';

/**
 * A VehicleStatusEntity.
 */
@Entity('vehicle_status')
export class VehicleStatusEntity extends BaseEntity {
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

  @OneToMany(type => VehicleStatusChangeReasonEntity, other => other.vehicleStatus)
  vehicleStatusChangeReasons: VehicleStatusChangeReasonEntity[];

  @OneToMany(type => VehicleEntity, other => other.vehicleStatus)
  vehicles: VehicleEntity[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
