import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleManufacturer, defaultValue } from 'app/shared/model/vehicle-manufacturer.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMANUFACTURER_LIST: 'vehicleManufacturer/FETCH_VEHICLEMANUFACTURER_LIST',
  FETCH_VEHICLEMANUFACTURER: 'vehicleManufacturer/FETCH_VEHICLEMANUFACTURER',
  CREATE_VEHICLEMANUFACTURER: 'vehicleManufacturer/CREATE_VEHICLEMANUFACTURER',
  UPDATE_VEHICLEMANUFACTURER: 'vehicleManufacturer/UPDATE_VEHICLEMANUFACTURER',
  PARTIAL_UPDATE_VEHICLEMANUFACTURER: 'vehicleManufacturer/PARTIAL_UPDATE_VEHICLEMANUFACTURER',
  DELETE_VEHICLEMANUFACTURER: 'vehicleManufacturer/DELETE_VEHICLEMANUFACTURER',
  RESET: 'vehicleManufacturer/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleManufacturer>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleManufacturerState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleManufacturerState = initialState, action): VehicleManufacturerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMANUFACTURER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMANUFACTURER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMANUFACTURER):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMANUFACTURER):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMANUFACTURER):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMANUFACTURER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMANUFACTURER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMANUFACTURER):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMANUFACTURER):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMANUFACTURER):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMANUFACTURER):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMANUFACTURER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMANUFACTURER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMANUFACTURER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMANUFACTURER):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMANUFACTURER):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMANUFACTURER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMANUFACTURER):
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

const apiUrl = 'api/vehicle-manufacturers';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleManufacturer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMANUFACTURER_LIST,
  payload: axios.get<IVehicleManufacturer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleManufacturer> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMANUFACTURER,
    payload: axios.get<IVehicleManufacturer>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleManufacturer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMANUFACTURER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleManufacturer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMANUFACTURER,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleManufacturer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMANUFACTURER,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleManufacturer> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMANUFACTURER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
