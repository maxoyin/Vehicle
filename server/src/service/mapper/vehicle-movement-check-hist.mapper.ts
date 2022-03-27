import { VehicleMovementCheckHistEntity } from '../../domain/vehicle-movement-check-hist.entity';
import { VehicleMovementCheckHistDTO } from '../dto/vehicle-movement-check-hist.dto';

/**
 * A VehicleMovementCheckHist mapper object.
 */
export class VehicleMovementCheckHistMapper {
  static fromDTOtoEntity(entityDTO: VehicleMovementCheckHistDTO): VehicleMovementCheckHistEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleMovementCheckHistEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleMovementCheckHistEntity): VehicleMovementCheckHistDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleMovementCheckHistDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
