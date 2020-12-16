import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from  'redux-thunk';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import libraryReducer from './library-reducer';

const reducers = combineReducers({
  initial: appReducer,
  auth: authReducer,
  library: libraryReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;
