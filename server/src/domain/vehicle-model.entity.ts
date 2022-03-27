/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleTrimEntity } from './vehicle-trim.entity';
import { VehicleManufacturerEntity } from './vehicle-manufacturer.entity';
import { VehicleTypeEntity } from './vehicle-type.entity';

/**
 * A VehicleModelEntity.
 */
@Entity('vehicle_model')
export class VehicleModelEntity extends BaseEntity {
  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'display_name' })
  displayName: string;

  /**
   * This identifies whether to show it in our application or not.
   */

  @Column({ type: 'boolean', name: 'is_display_on' })
  isDisplayOn: boolean;

  @Column({ type: 'date', name: 'model_year', nullable: true })
  modelYear: any;

  @Column({ name: 'description', nullable: true })
  description: string;

  @OneToMany(type => VehicleTrimEntity, other => other.vehicleModel)
  vehicleTrims: VehicleTrimEntity[];

  @ManyToOne(type => VehicleManufacturerEntity)
  vehicleManufacturer: VehicleManufacturerEntity;

  @ManyToOne(type => VehicleTypeEntity)
  vehicleType: VehicleTypeEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
