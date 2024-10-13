import { AlertActionTypes } from "../constants/alertConstants";

const alertReducer = (state = { message: null, status: null }, action) => {
    switch (action.type) {
        case AlertActionTypes.SHOW_ALERT_SUCCESS:
            return {
                ...state,
                message: action.payload,
                status: 'success'
            }
        case AlertActionTypes.SHOW_ALERT_WARNING:
            return {
                ...state,
                message: action.payload,
                status: 'warning'
            }
        case AlertActionTypes.SHOW_ALERT_ERROR:
            return {
                ...state,
                message: action.payload,
                status: 'error'
            }
        case AlertActionTypes.DISMISS_ALERT:
            return {
                message: null,
                status: null
            }
        default:
            return state
    }
}

export default alertReducer;
