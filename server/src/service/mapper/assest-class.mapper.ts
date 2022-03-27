import { AssestClassEntity } from '../../domain/assest-class.entity';
import { AssestClassDTO } from '../dto/assest-class.dto';

/**
 * A AssestClass mapper object.
 */
export class AssestClassMapper {
  static fromDTOtoEntity(entityDTO: AssestClassDTO): AssestClassEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new AssestClassEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: AssestClassEntity): AssestClassDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new AssestClassDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
