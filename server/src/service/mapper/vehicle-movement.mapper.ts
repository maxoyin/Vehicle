import { VehicleMovementEntity } from '../../domain/vehicle-movement.entity';
import { VehicleMovementDTO } from '../dto/vehicle-movement.dto';

/**
 * A VehicleMovement mapper object.
 */
export class VehicleMovementMapper {
  static fromDTOtoEntity(entityDTO: VehicleMovementDTO): VehicleMovementEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleMovementEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleMovementEntity): VehicleMovementDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleMovementDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
