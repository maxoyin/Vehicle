import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleTrim, defaultValue } from 'app/shared/model/vehicle-trim.model';

export const ACTION_TYPES = {
  FETCH_VEHICLETRIM_LIST: 'vehicleTrim/FETCH_VEHICLETRIM_LIST',
  FETCH_VEHICLETRIM: 'vehicleTrim/FETCH_VEHICLETRIM',
  CREATE_VEHICLETRIM: 'vehicleTrim/CREATE_VEHICLETRIM',
  UPDATE_VEHICLETRIM: 'vehicleTrim/UPDATE_VEHICLETRIM',
  PARTIAL_UPDATE_VEHICLETRIM: 'vehicleTrim/PARTIAL_UPDATE_VEHICLETRIM',
  DELETE_VEHICLETRIM: 'vehicleTrim/DELETE_VEHICLETRIM',
  RESET: 'vehicleTrim/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleTrim>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleTrimState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleTrimState = initialState, action): VehicleTrimState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLETRIM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLETRIM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLETRIM):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLETRIM):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLETRIM):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLETRIM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLETRIM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLETRIM):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLETRIM):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLETRIM):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLETRIM):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLETRIM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLETRIM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLETRIM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLETRIM):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLETRIM):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLETRIM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLETRIM):
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

const apiUrl = 'api/vehicle-trims';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleTrim> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLETRIM_LIST,
  payload: axios.get<IVehicleTrim>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleTrim> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLETRIM,
    payload: axios.get<IVehicleTrim>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleTrim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLETRIM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleTrim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLETRIM,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleTrim> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLETRIM,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleTrim> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLETRIM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
