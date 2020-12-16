import { authAPI } from '../firebase/firebase';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER0DATA';
const TOGGLE_IS_SENDING = 'TOGGLE_IS_SENDING';

const initialState = {
  isAuth: false,
  isSending: false,
  email: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return ({
        ...state,
        isAuth: action.isAuth,
        email: action.email
      })
    case TOGGLE_IS_SENDING:
      return ({
        ...state,
        isSending: action.isSending
      })
    default:
      return state;
  }
}

export const setUserData = (isAuth, email) => {
  return {
    type: SET_USER_DATA,
    isAuth,
    email
  }
}

export const toggleIsSending = (isSending) => {
  return {
    type: TOGGLE_IS_SENDING,
    isSending
  }
}

export const initialApp = () => dispatch => {
  const email = localStorage.getItem('user');

  if (email) {
    dispatch(setUserData(true, email));
  }
}

const setLocalStorage = (email) => {
  localStorage.setItem('user', email);
}

const removeLocalStorage = () => {
  localStorage.removeItem('user');
}

const authFuncCreator = action => (email, password) => async dispatch => {
  dispatch(toggleIsSending(true));
  const response = await authAPI.getUser(email, password);

  action(email, password, response, dispatch);

  dispatch(toggleIsSending(false));
}

const loginFunc = (email, password, response, dispatch) => {
  if (!response.exists || response.data().password !== password) {
    dispatch(stopSubmit('login', { _error: 'Incorrect email or password' }));
  } else {
    dispatch(setUserData(true, email));
    setLocalStorage(email);
  }
}

const registrationFunc = async (email, password, response, dispatch) => {
  if (response.exists) {
    dispatch(stopSubmit('registration', { _error: 'this email is already taken' }));
  }

  if (!response.exists) {
    await authAPI.setUser(email, password).catch(error => {
      return dispatch(stopSubmit('registration', { _error: error }));
    });

    dispatch(setUserData(true, email));
    setLocalStorage(email);
  }
}

export const login = authFuncCreator(loginFunc);
export const registration = authFuncCreator(registrationFunc);

export const logout = () => dispatch => {
  dispatch(setUserData(false, null));
  removeLocalStorage();
}

export default authReducer;