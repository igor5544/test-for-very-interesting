import { initialApp } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return ({
        ...state,
        initialized: true
      })
    default:
      return state;
  }
}

export const setInitialazedSuccess = () => {
  return {
    type: INITIALIZED_SUCCESS,
  }
}

export const initializeApp = () => async dispatch => {
  await dispatch(initialApp())

  dispatch(setInitialazedSuccess());
}

export default appReducer;