import { EntityRepository, Repository } from 'typeorm';
import { SimNetworkEntity } from '../domain/sim-network.entity';

@EntityRepository(SimNetworkEntity)
export class SimNetworkRepository extends Repository<SimNetworkEntity> {}
