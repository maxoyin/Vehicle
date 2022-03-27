import { VehicleTrimEntity } from '../../domain/vehicle-trim.entity';
import { VehicleTrimDTO } from '../dto/vehicle-trim.dto';

/**
 * A VehicleTrim mapper object.
 */
export class VehicleTrimMapper {
  static fromDTOtoEntity(entityDTO: VehicleTrimDTO): VehicleTrimEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleTrimEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleTrimEntity): VehicleTrimDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleTrimDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
