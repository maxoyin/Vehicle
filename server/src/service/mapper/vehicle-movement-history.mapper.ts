import { VehicleMovementHistoryEntity } from '../../domain/vehicle-movement-history.entity';
import { VehicleMovementHistoryDTO } from '../dto/vehicle-movement-history.dto';

/**
 * A VehicleMovementHistory mapper object.
 */
export class VehicleMovementHistoryMapper {
  static fromDTOtoEntity(entityDTO: VehicleMovementHistoryDTO): VehicleMovementHistoryEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleMovementHistoryEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleMovementHistoryEntity): VehicleMovementHistoryDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleMovementHistoryDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
