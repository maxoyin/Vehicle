import { VehicleStatusEntity } from '../../domain/vehicle-status.entity';
import { VehicleStatusDTO } from '../dto/vehicle-status.dto';

/**
 * A VehicleStatus mapper object.
 */
export class VehicleStatusMapper {
  static fromDTOtoEntity(entityDTO: VehicleStatusDTO): VehicleStatusEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleStatusEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleStatusEntity): VehicleStatusDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleStatusDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
