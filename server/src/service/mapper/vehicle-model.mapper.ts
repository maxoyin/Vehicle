import { VehicleModelEntity } from '../../domain/vehicle-model.entity';
import { VehicleModelDTO } from '../dto/vehicle-model.dto';

/**
 * A VehicleModel mapper object.
 */
export class VehicleModelMapper {
  static fromDTOtoEntity(entityDTO: VehicleModelDTO): VehicleModelEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleModelEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleModelEntity): VehicleModelDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleModelDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
