import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS :
            //merge current streams with new stream
            return {...state, ..._.mapKeys(action.payload, 'id') } //second arg lodash method mapKeys - creates an obj with id number as the key and the action.payload as the value
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload } //bracket syntax is key interpolation es6
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, action.payload); //omit method from lodash creates a new obj with all properties from original state except action.payload property (which is an id)
        default: 
            return state;
    }
};