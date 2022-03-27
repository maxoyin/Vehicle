/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleModelEntity } from './vehicle-model.entity';
import { AssestClassEntity } from './assest-class.entity';

/**
 * This stores Motorcycle,Tricycle,Car,Minibus,eMotorcycle,eTricycle,Van etc
 */
@Entity('vehicle_type')
export class VehicleTypeEntity extends BaseEntity {
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

  @OneToMany(type => VehicleModelEntity, other => other.vehicleType)
  vehicleModels: VehicleModelEntity[];

  @ManyToOne(type => AssestClassEntity)
  assestClass: AssestClassEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
