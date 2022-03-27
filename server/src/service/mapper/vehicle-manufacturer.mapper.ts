import { VehicleManufacturerEntity } from '../../domain/vehicle-manufacturer.entity';
import { VehicleManufacturerDTO } from '../dto/vehicle-manufacturer.dto';

/**
 * A VehicleManufacturer mapper object.
 */
export class VehicleManufacturerMapper {
  static fromDTOtoEntity(entityDTO: VehicleManufacturerDTO): VehicleManufacturerEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleManufacturerEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleManufacturerEntity): VehicleManufacturerDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleManufacturerDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
