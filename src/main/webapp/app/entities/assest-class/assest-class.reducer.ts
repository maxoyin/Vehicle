import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAssestClass, defaultValue } from 'app/shared/model/assest-class.model';

export const ACTION_TYPES = {
  FETCH_ASSESTCLASS_LIST: 'assestClass/FETCH_ASSESTCLASS_LIST',
  FETCH_ASSESTCLASS: 'assestClass/FETCH_ASSESTCLASS',
  CREATE_ASSESTCLASS: 'assestClass/CREATE_ASSESTCLASS',
  UPDATE_ASSESTCLASS: 'assestClass/UPDATE_ASSESTCLASS',
  PARTIAL_UPDATE_ASSESTCLASS: 'assestClass/PARTIAL_UPDATE_ASSESTCLASS',
  DELETE_ASSESTCLASS: 'assestClass/DELETE_ASSESTCLASS',
  RESET: 'assestClass/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAssestClass>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AssestClassState = Readonly<typeof initialState>;

// Reducer

export default (state: AssestClassState = initialState, action): AssestClassState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ASSESTCLASS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ASSESTCLASS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ASSESTCLASS):
    case REQUEST(ACTION_TYPES.UPDATE_ASSESTCLASS):
    case REQUEST(ACTION_TYPES.DELETE_ASSESTCLASS):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ASSESTCLASS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ASSESTCLASS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ASSESTCLASS):
    case FAILURE(ACTION_TYPES.CREATE_ASSESTCLASS):
    case FAILURE(ACTION_TYPES.UPDATE_ASSESTCLASS):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ASSESTCLASS):
    case FAILURE(ACTION_TYPES.DELETE_ASSESTCLASS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ASSESTCLASS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ASSESTCLASS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ASSESTCLASS):
    case SUCCESS(ACTION_TYPES.UPDATE_ASSESTCLASS):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ASSESTCLASS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ASSESTCLASS):
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

const apiUrl = 'api/assest-classes';

// Actions

export const getEntities: ICrudGetAllAction<IAssestClass> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ASSESTCLASS_LIST,
  payload: axios.get<IAssestClass>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAssestClass> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ASSESTCLASS,
    payload: axios.get<IAssestClass>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAssestClass> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ASSESTCLASS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAssestClass> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ASSESTCLASS,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IAssestClass> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ASSESTCLASS,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAssestClass> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ASSESTCLASS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
