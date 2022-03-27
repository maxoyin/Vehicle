import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IVehicleStatChangeSubReason, defaultValue } from 'app/shared/model/vehicle-stat-change-sub-reason.model';

export const ACTION_TYPES = {
  FETCH_VEHICLESTATCHANGESUBREASON_LIST: 'vehicleStatChangeSubReason/FETCH_VEHICLESTATCHANGESUBREASON_LIST',
  FETCH_VEHICLESTATCHANGESUBREASON: 'vehicleStatChangeSubReason/FETCH_VEHICLESTATCHANGESUBREASON',
  CREATE_VEHICLESTATCHANGESUBREASON: 'vehicleStatChangeSubReason/CREATE_VEHICLESTATCHANGESUBREASON',
  UPDATE_VEHICLESTATCHANGESUBREASON: 'vehicleStatChangeSubReason/UPDATE_VEHICLESTATCHANGESUBREASON',
  PARTIAL_UPDATE_VEHICLESTATCHANGESUBREASON: 'vehicleStatChangeSubReason/PARTIAL_UPDATE_VEHICLESTATCHANGESUBREASON',
  DELETE_VEHICLESTATCHANGESUBREASON: 'vehicleStatChangeSubReason/DELETE_VEHICLESTATCHANGESUBREASON',
  RESET: 'vehicleStatChangeSubReason/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IVehicleStatChangeSubReason>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type VehicleStatChangeSubReasonState = Readonly<typeof initialState>;

// Reducer

export default (state: VehicleStatChangeSubReasonState = initialState, action): VehicleStatChangeSubReasonState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_VEHICLESTATCHANGESUBREASON):
    case REQUEST(ACTION_TYPES.UPDATE_VEHICLESTATCHANGESUBREASON):
    case REQUEST(ACTION_TYPES.DELETE_VEHICLESTATCHANGESUBREASON):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATCHANGESUBREASON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON):
    case FAILURE(ACTION_TYPES.CREATE_VEHICLESTATCHANGESUBREASON):
    case FAILURE(ACTION_TYPES.UPDATE_VEHICLESTATCHANGESUBREASON):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATCHANGESUBREASON):
    case FAILURE(ACTION_TYPES.DELETE_VEHICLESTATCHANGESUBREASON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_VEHICLESTATCHANGESUBREASON):
    case SUCCESS(ACTION_TYPES.UPDATE_VEHICLESTATCHANGESUBREASON):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATCHANGESUBREASON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_VEHICLESTATCHANGESUBREASON):
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

const apiUrl = 'api/vehicle-stat-change-sub-reasons';

// Actions

export const getEntities: ICrudGetAllAction<IVehicleStatChangeSubReason> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON_LIST,
  payload: axios.get<IVehicleStatChangeSubReason>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IVehicleStatChangeSubReason> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_VEHICLESTATCHANGESUBREASON,
    payload: axios.get<IVehicleStatChangeSubReason>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IVehicleStatChangeSubReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_VEHICLESTATCHANGESUBREASON,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IVehicleStatChangeSubReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_VEHICLESTATCHANGESUBREASON,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IVehicleStatChangeSubReason> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_VEHICLESTATCHANGESUBREASON,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IVehicleStatChangeSubReason> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_VEHICLESTATCHANGESUBREASON,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
