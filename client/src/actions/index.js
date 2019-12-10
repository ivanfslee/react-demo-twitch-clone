import streams from '../apis/streams';
import history from '../history';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,  
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM 
} from './types';


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//making a post request to our api server via axios 
export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth; //get userId from auth object 
    const response = await streams.post('/streams', { ...formValues, userId }); 
    
    //dispatch a CREATE_STREAM action with response data from api server
    dispatch({ type: CREATE_STREAM, payload: response.data });
    //do some programmtic navigation to root route here based on response was successful or not 
    history.push('/'); //once action dispatched, we move the user to root route
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data })
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data});
};

//pass in id of stream you want to edit, formValues is text you want to edit to 
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch( { type: EDIT_STREAM, payload: response.data });
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch( { type: DELETE_STREAM, payload: id })
}