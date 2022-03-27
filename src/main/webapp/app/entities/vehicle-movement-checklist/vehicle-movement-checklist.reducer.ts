import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMovementChecklist, defaultValue } from 'app/shared/model/vehicle-movement-checklist.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMOVEMENTCHECKLIST_LIST: 'vehicleMovementChecklist/FETCH_VEHICLEMOVEMENTCHECKLIST_LIST',
  FETCH_VEHICLEMOVEMENTCHECKLIST: 'vehicleMovementChecklist/FETCH_VEHICLEMOVEMENTCHECKLIST',
  CREATE_VEHICLEMOVEMENTCHECKLIST: 'vehicleMovementChecklist/CREATE_VEHICLEMOVEMENTCHECKLIST',
  UPDATE_VEHICLEMOVEMENTCHECKLIST: 'vehicleMovementChecklist/UPDATE_VEHICLEMOVEMENTCHECKLIST',
  PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKLIST: 'vehicleMovementChecklist/PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKLIST',
  DELETE_VEHICLEMOVEMENTCHECKLIST: 'vehicleMovementChecklist/DELETE_VEHICLEMOVEMENTCHECKLIST',
  RESET: 'vehicleMovementChecklist/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMovementChecklist>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleMovementChecklistState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMovementChecklistState = initialState, action): VehicleMovementChecklistState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKLIST):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKLIST):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKLIST):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKLIST):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKLIST):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKLIST):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKLIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKLIST):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKLIST):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/vehicle-movement-checklists';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMovementChecklist> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST_LIST,
  payload: axios.get<IVehicleMovementChecklist>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleMovementChecklist> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKLIST,
    payload: axios.get<IVehicleMovementChecklist>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleMovementChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKLIST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMovementChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKLIST,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleMovementChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKLIST,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMovementChecklist> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKLIST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
