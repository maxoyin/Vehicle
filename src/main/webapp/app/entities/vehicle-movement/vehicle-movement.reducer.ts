import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMovement, defaultValue } from 'app/shared/model/vehicle-movement.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMOVEMENT_LIST: 'vehicleMovement/FETCH_VEHICLEMOVEMENT_LIST',
  FETCH_VEHICLEMOVEMENT: 'vehicleMovement/FETCH_VEHICLEMOVEMENT',
  CREATE_VEHICLEMOVEMENT: 'vehicleMovement/CREATE_VEHICLEMOVEMENT',
  UPDATE_VEHICLEMOVEMENT: 'vehicleMovement/UPDATE_VEHICLEMOVEMENT',
  PARTIAL_UPDATE_VEHICLEMOVEMENT: 'vehicleMovement/PARTIAL_UPDATE_VEHICLEMOVEMENT',
  DELETE_VEHICLEMOVEMENT: 'vehicleMovement/DELETE_VEHICLEMOVEMENT',
  RESET: 'vehicleMovement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMovement>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleMovementState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMovementState = initialState, action): VehicleMovementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMOVEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMOVEMENT):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMOVEMENT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENT):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMOVEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMOVEMENT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENT):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMOVEMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMOVEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMOVEMENT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMOVEMENT):
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

const apiUrl = 'api/vehicle-movements';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMovement> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMOVEMENT_LIST,
  payload: axios.get<IVehicleMovement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleMovement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMOVEMENT,
    payload: axios.get<IVehicleMovement>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleMovement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMOVEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMovement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMOVEMENT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleMovement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMovement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMOVEMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
