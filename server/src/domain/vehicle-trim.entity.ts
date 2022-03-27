/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleEntity } from './vehicle.entity';
import { VehicleModelEntity } from './vehicle-model.entity';

/**
 * A VehicleTrimEntity.
 */
@Entity('vehicle_trim')
export class VehicleTrimEntity extends BaseEntity {
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

  /**
   * This identifies whether to show it in our application or not.
   */

  @Column({ type: 'boolean', name: 'is_display_on' })
  isDisplayOn: boolean;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(type => VehicleEntity, other => other.vehicleTrim)
  vehicles: VehicleEntity[];

  @ManyToOne(type => VehicleModelEntity)
  vehicleModel: VehicleModelEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
