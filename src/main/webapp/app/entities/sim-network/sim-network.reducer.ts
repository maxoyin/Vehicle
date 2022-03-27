import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISimNetwork, defaultValue } from 'app/shared/model/sim-network.model';

export const ACTION_TYPES = {
  FETCH_SIMNETWORK_LIST: 'simNetwork/FETCH_SIMNETWORK_LIST',
  FETCH_SIMNETWORK: 'simNetwork/FETCH_SIMNETWORK',
  CREATE_SIMNETWORK: 'simNetwork/CREATE_SIMNETWORK',
  UPDATE_SIMNETWORK: 'simNetwork/UPDATE_SIMNETWORK',
  PARTIAL_UPDATE_SIMNETWORK: 'simNetwork/PARTIAL_UPDATE_SIMNETWORK',
  DELETE_SIMNETWORK: 'simNetwork/DELETE_SIMNETWORK',
  RESET: 'simNetwork/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISimNetwork>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SimNetworkState = Readonly<typeof initialState>;

// Reducer

export default (state: SimNetworkState = initialState, action): SimNetworkState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SIMNETWORK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SIMNETWORK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SIMNETWORK):
    case REQUEST(ACTION_TYPES.UPDATE_SIMNETWORK):
    case REQUEST(ACTION_TYPES.DELETE_SIMNETWORK):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_SIMNETWORK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SIMNETWORK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SIMNETWORK):
    case FAILURE(ACTION_TYPES.CREATE_SIMNETWORK):
    case FAILURE(ACTION_TYPES.UPDATE_SIMNETWORK):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_SIMNETWORK):
    case FAILURE(ACTION_TYPES.DELETE_SIMNETWORK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SIMNETWORK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SIMNETWORK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SIMNETWORK):
    case SUCCESS(ACTION_TYPES.UPDATE_SIMNETWORK):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_SIMNETWORK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SIMNETWORK):
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

const apiUrl = 'api/sim-networks';

// Actions

export const getEntities: ICrudGetAllAction<ISimNetwork> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SIMNETWORK_LIST,
  payload: axios.get<ISimNetwork>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISimNetwork> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SIMNETWORK,
    payload: axios.get<ISimNetwork>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISimNetwork> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SIMNETWORK,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISimNetwork> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SIMNETWORK,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ISimNetwork> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_SIMNETWORK,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISimNetwork> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SIMNETWORK,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
