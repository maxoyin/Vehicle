/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A SimNetworkEntity.
 */
@Entity('sim_network')
export class SimNetworkEntity extends BaseEntity {
  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
