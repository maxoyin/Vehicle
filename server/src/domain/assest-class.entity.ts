/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { VehicleTypeEntity } from './vehicle-type.entity';

/**
 * This stores 2 wheeler, 3 wheeler, 4 wheeler etc as a value
 */
@Entity('assest_class')
export class AssestClassEntity extends BaseEntity {
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

  @OneToMany(type => VehicleTypeEntity, other => other.assestClass)
  vehicleTypes: VehicleTypeEntity[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
