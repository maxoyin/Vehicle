import { VehicleMovementChecklistEntity } from '../../domain/vehicle-movement-checklist.entity';
import { VehicleMovementChecklistDTO } from '../dto/vehicle-movement-checklist.dto';

/**
 * A VehicleMovementChecklist mapper object.
 */
export class VehicleMovementChecklistMapper {
  static fromDTOtoEntity(entityDTO: VehicleMovementChecklistDTO): VehicleMovementChecklistEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleMovementChecklistEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleMovementChecklistEntity): VehicleMovementChecklistDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleMovementChecklistDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
