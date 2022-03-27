import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleStatusChangeReason, defaultValue } from 'app/shared/model/vehicle-status-change-reason.model';

export const ACTION_TYPES = {
  FETCH_VEHICLESTATUSCHANGEREASON_LIST: 'vehicleStatusChangeReason/FETCH_VEHICLESTATUSCHANGEREASON_LIST',
  FETCH_VEHICLESTATUSCHANGEREASON: 'vehicleStatusChangeReason/FETCH_VEHICLESTATUSCHANGEREASON',
  CREATE_VEHICLESTATUSCHANGEREASON: 'vehicleStatusChangeReason/CREATE_VEHICLESTATUSCHANGEREASON',
  UPDATE_VEHICLESTATUSCHANGEREASON: 'vehicleStatusChangeReason/UPDATE_VEHICLESTATUSCHANGEREASON',
  PARTIAL_UPDATE_VEHICLESTATUSCHANGEREASON: 'vehicleStatusChangeReason/PARTIAL_UPDATE_VEHICLESTATUSCHANGEREASON',
  DELETE_VEHICLESTATUSCHANGEREASON: 'vehicleStatusChangeReason/DELETE_VEHICLESTATUSCHANGEREASON',
  RESET: 'vehicleStatusChangeReason/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleStatusChangeReason>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleStatusChangeReasonState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleStatusChangeReasonState = initialState, action): VehicleStatusChangeReasonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLESTATUSCHANGEREASON):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLESTATUSCHANGEREASON):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLESTATUSCHANGEREASON):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUSCHANGEREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLESTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLESTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUSCHANGEREASON):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLESTATUSCHANGEREASON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLESTATUSCHANGEREASON):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLESTATUSCHANGEREASON):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUSCHANGEREASON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLESTATUSCHANGEREASON):
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

const apiUrl = 'api/vehicle-status-change-reasons';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleStatusChangeReason> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON_LIST,
  payload: axios.get<IVehicleStatusChangeReason>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleStatusChangeReason> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLESTATUSCHANGEREASON,
    payload: axios.get<IVehicleStatusChangeReason>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleStatusChangeReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLESTATUSCHANGEREASON,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleStatusChangeReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLESTATUSCHANGEREASON,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleStatusChangeReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATUSCHANGEREASON,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleStatusChangeReason> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLESTATUSCHANGEREASON,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
