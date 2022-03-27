import { VehicleStatChangeSubReasonEntity } from '../../domain/vehicle-stat-change-sub-reason.entity';
import { VehicleStatChangeSubReasonDTO } from '../dto/vehicle-stat-change-sub-reason.dto';

/**
 * A VehicleStatChangeSubReason mapper object.
 */
export class VehicleStatChangeSubReasonMapper {
  static fromDTOtoEntity(entityDTO: VehicleStatChangeSubReasonDTO): VehicleStatChangeSubReasonEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new VehicleStatChangeSubReasonEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: VehicleStatChangeSubReasonEntity): VehicleStatChangeSubReasonDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new VehicleStatChangeSubReasonDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
