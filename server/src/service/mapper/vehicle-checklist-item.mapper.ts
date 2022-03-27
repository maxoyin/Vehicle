import { VehicleChecklistItemEntity } from '../../domain/vehicle-checklist-item.entity';
import { VehicleChecklistItemDTO } from '../dto/vehicle-checklist-item.dto';

/**
 * A VehicleChecklistItem mapper object.
 */
export class VehicleChecklistItemMapper {
  static fromDTOtoEntity(entityDTO: VehicleChecklistItemDTO): VehicleChecklistItemEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleChecklistItemEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleChecklistItemEntity): VehicleChecklistItemDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleChecklistItemDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
