import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleChecklistItem, defaultValue } from 'app/shared/model/vehicle-checklist-item.model';

export const ACTION_TYPES = {
  FETCH_VEHICLECHECKLISTITEM_LIST: 'vehicleChecklistItem/FETCH_VEHICLECHECKLISTITEM_LIST',
  FETCH_VEHICLECHECKLISTITEM: 'vehicleChecklistItem/FETCH_VEHICLECHECKLISTITEM',
  CREATE_VEHICLECHECKLISTITEM: 'vehicleChecklistItem/CREATE_VEHICLECHECKLISTITEM',
  UPDATE_VEHICLECHECKLISTITEM: 'vehicleChecklistItem/UPDATE_VEHICLECHECKLISTITEM',
  PARTIAL_UPDATE_VEHICLECHECKLISTITEM: 'vehicleChecklistItem/PARTIAL_UPDATE_VEHICLECHECKLISTITEM',
  DELETE_VEHICLECHECKLISTITEM: 'vehicleChecklistItem/DELETE_VEHICLECHECKLISTITEM',
  RESET: 'vehicleChecklistItem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleChecklistItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleChecklistItemState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleChecklistItemState = initialState, action): VehicleChecklistItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLECHECKLISTITEM):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLECHECKLISTITEM):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLECHECKLISTITEM):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLECHECKLISTITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLECHECKLISTITEM):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLECHECKLISTITEM):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLECHECKLISTITEM):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLECHECKLISTITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLECHECKLISTITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLECHECKLISTITEM):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLECHECKLISTITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLECHECKLISTITEM):
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

const apiUrl = 'api/vehicle-checklist-items';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleChecklistItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM_LIST,
  payload: axios.get<IVehicleChecklistItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleChecklistItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLECHECKLISTITEM,
    payload: axios.get<IVehicleChecklistItem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleChecklistItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLECHECKLISTITEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleChecklistItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLECHECKLISTITEM,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleChecklistItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLECHECKLISTITEM,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleChecklistItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLECHECKLISTITEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
