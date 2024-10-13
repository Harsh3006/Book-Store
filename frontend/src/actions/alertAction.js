import { CLEAR_ERROR, AlertActionTypes } from "../constants/alertConstants";

export const showSuccess = (message) => (dispatch) => {
    dispatch({
        type: AlertActionTypes.SHOW_ALERT_SUCCESS,
        payload: message
    })
    setTimeout(() => {
        dispatch(hideAlert());
    }, 5000);
};

export const showWarning = (message) => (dispatch) => {
    dispatch({
        type: AlertActionTypes.SHOW_ALERT_WARNING,
        payload: message
    })
    setTimeout(() => {
        dispatch(hideAlert());
    }, 5000);
};

export const showError = (message) => (dispatch) => {
    dispatch({
        type: AlertActionTypes.SHOW_ALERT_ERROR,
        payload: message
    });
    setTimeout(() => {
        dispatch(hideAlert());
    }, 5000);
};

export const hideAlert = () => (dispatch) => {
    dispatch({
        type: AlertActionTypes.DISMISS_ALERT
    });
    dispatch({
        type: CLEAR_ERROR
    })
}

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}
