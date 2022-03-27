import { VehicleStatusChangeReasonEntity } from '../../domain/vehicle-status-change-reason.entity';
import { VehicleStatusChangeReasonDTO } from '../dto/vehicle-status-change-reason.dto';

/**
 * A VehicleStatusChangeReason mapper object.
 */
export class VehicleStatusChangeReasonMapper {
  static fromDTOtoEntity(entityDTO: VehicleStatusChangeReasonDTO): VehicleStatusChangeReasonEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleStatusChangeReasonEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleStatusChangeReasonEntity): VehicleStatusChangeReasonDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleStatusChangeReasonDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
