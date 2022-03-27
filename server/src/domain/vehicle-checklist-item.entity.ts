/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * Master table to hold all checklist items for a vehicle
 */
@Entity('vehicle_checklist_item')
export class VehicleChecklistItemEntity extends BaseEntity {
  /**
   * unique human readable name. Such as helmet
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

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
