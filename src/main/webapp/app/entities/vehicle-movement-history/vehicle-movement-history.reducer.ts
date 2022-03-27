import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMovementHistory, defaultValue } from 'app/shared/model/vehicle-movement-history.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMOVEMENTHISTORY_LIST: 'vehicleMovementHistory/FETCH_VEHICLEMOVEMENTHISTORY_LIST',
  FETCH_VEHICLEMOVEMENTHISTORY: 'vehicleMovementHistory/FETCH_VEHICLEMOVEMENTHISTORY',
  CREATE_VEHICLEMOVEMENTHISTORY: 'vehicleMovementHistory/CREATE_VEHICLEMOVEMENTHISTORY',
  UPDATE_VEHICLEMOVEMENTHISTORY: 'vehicleMovementHistory/UPDATE_VEHICLEMOVEMENTHISTORY',
  PARTIAL_UPDATE_VEHICLEMOVEMENTHISTORY: 'vehicleMovementHistory/PARTIAL_UPDATE_VEHICLEMOVEMENTHISTORY',
  DELETE_VEHICLEMOVEMENTHISTORY: 'vehicleMovementHistory/DELETE_VEHICLEMOVEMENTHISTORY',
  RESET: 'vehicleMovementHistory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMovementHistory>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleMovementHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMovementHistoryState = initialState, action): VehicleMovementHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMOVEMENTHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMOVEMENTHISTORY):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMOVEMENTHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTHISTORY):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMOVEMENTHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMOVEMENTHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTHISTORY):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMOVEMENTHISTORY):
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

const apiUrl = 'api/vehicle-movement-histories';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMovementHistory> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY_LIST,
  payload: axios.get<IVehicleMovementHistory>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleMovementHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMOVEMENTHISTORY,
    payload: axios.get<IVehicleMovementHistory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleMovementHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMOVEMENTHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMovementHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMOVEMENTHISTORY,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleMovementHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTHISTORY,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMovementHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMOVEMENTHISTORY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
