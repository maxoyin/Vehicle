/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleModelEntity } from './vehicle-model.entity';

/**
 * A VehicleManufacturerEntity.
 */
@Entity('vehicle_manufacturer')
export class VehicleManufacturerEntity extends BaseEntity {
  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'display_name' })
  displayName: string;

  /**
   * This identifies whether to show it in our application or not.
   */

  @Column({ type: 'boolean', name: 'is_display_on' })
  isDisplayOn: boolean;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(type => VehicleModelEntity, other => other.vehicleManufacturer)
  vehicleModels: VehicleModelEntity[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
