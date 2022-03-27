import { VehicleEntity } from '../../domain/vehicle.entity';
import { VehicleDTO } from '../dto/vehicle.dto';

/**
 * A Vehicle mapper object.
 */
export class VehicleMapper {
  static fromDTOtoEntity(entityDTO: VehicleDTO): VehicleEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleEntity): VehicleDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
