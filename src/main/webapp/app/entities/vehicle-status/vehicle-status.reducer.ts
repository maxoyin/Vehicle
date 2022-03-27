import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleStatus, defaultValue } from 'app/shared/model/vehicle-status.model';

export const ACTION_TYPES = {
  FETCH_VEHICLESTATUS_LIST: 'vehicleStatus/FETCH_VEHICLESTATUS_LIST',
  FETCH_VEHICLESTATUS: 'vehicleStatus/FETCH_VEHICLESTATUS',
  CREATE_VEHICLESTATUS: 'vehicleStatus/CREATE_VEHICLESTATUS',
  UPDATE_VEHICLESTATUS: 'vehicleStatus/UPDATE_VEHICLESTATUS',
  PARTIAL_UPDATE_VEHICLESTATUS: 'vehicleStatus/PARTIAL_UPDATE_VEHICLESTATUS',
  DELETE_VEHICLESTATUS: 'vehicleStatus/DELETE_VEHICLESTATUS',
  RESET: 'vehicleStatus/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleStatus>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleStatusState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleStatusState = initialState, action): VehicleStatusState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLESTATUS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLESTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLESTATUS):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLESTATUS):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLESTATUS):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLESTATUS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLESTATUS):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLESTATUS):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLESTATUS):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUS):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLESTATUS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLESTATUS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLESTATUS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLESTATUS):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLESTATUS):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLESTATUS):
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

const apiUrl = 'api/vehicle-statuses';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleStatus> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLESTATUS_LIST,
  payload: axios.get<IVehicleStatus>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleStatus> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLESTATUS,
    payload: axios.get<IVehicleStatus>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLESTATUS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLESTATUS,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleStatus> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUS,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleStatus> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLESTATUS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
