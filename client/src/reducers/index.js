import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //hook up redux-form reducer
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer
});