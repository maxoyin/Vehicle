import { SimNetworkEntity } from '../../domain/sim-network.entity';
import { SimNetworkDTO } from '../dto/sim-network.dto';

/**
 * A SimNetwork mapper object.
 */
export class SimNetworkMapper {
  static fromDTOtoEntity(entityDTO: SimNetworkDTO): SimNetworkEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new SimNetworkEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: SimNetworkEntity): SimNetworkDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new SimNetworkDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
