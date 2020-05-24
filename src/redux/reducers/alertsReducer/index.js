import {
    SHOW_ALERT,
    HIDE_ALERT
} from '../../actionTypes';

//Every reducer has its own state
const initialState = {
    alert: null,
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SHOW_ALERT:
            return {
                ...state,
                alert: payload,
            }
        case HIDE_ALERT: {
            return {
                ...state,
                alert: null
            }
        } 

        default:
            return {

                ...state,
            }
    }

}