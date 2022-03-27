import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleMovementCheckHist, defaultValue } from 'app/shared/model/vehicle-movement-check-hist.model';

export const ACTION_TYPES = {
  FETCH_VEHICLEMOVEMENTCHECKHIST_LIST: 'vehicleMovementCheckHist/FETCH_VEHICLEMOVEMENTCHECKHIST_LIST',
  FETCH_VEHICLEMOVEMENTCHECKHIST: 'vehicleMovementCheckHist/FETCH_VEHICLEMOVEMENTCHECKHIST',
  CREATE_VEHICLEMOVEMENTCHECKHIST: 'vehicleMovementCheckHist/CREATE_VEHICLEMOVEMENTCHECKHIST',
  UPDATE_VEHICLEMOVEMENTCHECKHIST: 'vehicleMovementCheckHist/UPDATE_VEHICLEMOVEMENTCHECKHIST',
  PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKHIST: 'vehicleMovementCheckHist/PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKHIST',
  DELETE_VEHICLEMOVEMENTCHECKHIST: 'vehicleMovementCheckHist/DELETE_VEHICLEMOVEMENTCHECKHIST',
  RESET: 'vehicleMovementCheckHist/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleMovementCheckHist>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleMovementCheckHistState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleMovementCheckHistState = initialState, action): VehicleMovementCheckHistState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKHIST):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKHIST):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKHIST):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKHIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKHIST):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKHIST):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKHIST):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKHIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKHIST):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKHIST):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKHIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKHIST):
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

const apiUrl = 'api/vehicle-movement-check-hists';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleMovementCheckHist> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST_LIST,
  payload: axios.get<IVehicleMovementCheckHist>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleMovementCheckHist> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLEMOVEMENTCHECKHIST,
    payload: axios.get<IVehicleMovementCheckHist>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleMovementCheckHist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLEMOVEMENTCHECKHIST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleMovementCheckHist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLEMOVEMENTCHECKHIST,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleMovementCheckHist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLEMOVEMENTCHECKHIST,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleMovementCheckHist> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLEMOVEMENTCHECKHIST,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
