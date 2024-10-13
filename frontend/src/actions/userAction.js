import { CustomerActionTypes, ShippingAddressActionTypes, UserActionTypes} from '../constants/userConstants';
import axiosInstance from '../axiosInstance';
import { showSuccess } from './alertAction';

export const login = (email, password) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('user/login/', {
            email: email,
            password: password
        }, {
            withCredentials: false
        });
        dispatch({
            type: UserActionTypes.USER_LOGIN_SUCCESS,
            payload: data
        });
        dispatch(showSuccess(`Welcome ${data.user}`));
        // Store the tokens in local storage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
    }
    catch (error) {
        dispatch({
            type: UserActionTypes.USER_LOGIN_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const register = (firstName, lastName, email, password) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('user/register/', {
            username: email,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password
        }, {
            withCredentials: false
        });
        dispatch({
            type: UserActionTypes.USER_REGISTER_SUCCESS,
        });
        dispatch(showSuccess(data));
        dispatch(login(email, password));
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: UserActionTypes.USER_REGISTER_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch({
        type: UserActionTypes.USER_LOGOUT
    });
}

export const getCustomerRecord = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('user/record/');
        dispatch({
            type: CustomerActionTypes.CUSTOMER_RECORD_GET_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CustomerActionTypes.CUSTOMER_RECORD_GET_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const updateCustomerRecord = (formData) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post('user/record/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        dispatch({
            type: CustomerActionTypes.CUSTOMER_RECORD_UPDATE_SUCCESS
        });
        dispatch(showSuccess(data));
        dispatch(getCustomerRecord());
    } catch (error) {
        dispatch({
            type: CustomerActionTypes.CUSTOMER_RECORD_UPDATE_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const getShippingAddress = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("user/shipping_address/");
        dispatch({
            type: ShippingAddressActionTypes.SHIPPING_ADDRESS_GET_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ShippingAddressActionTypes.SHIPPING_ADDRESS_GET_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const updateShippingAddress = (formData) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post("user/shipping_address/", formData);
        dispatch({
            type: ShippingAddressActionTypes.SHIPPING_ADDRESS_UPDATE_SUCCESS,
        });
        dispatch(showSuccess(data));
        dispatch(getShippingAddress());
    } catch (error) {
        dispatch({
            type: ShippingAddressActionTypes.SHIPPING_ADDRESS_UPDATE_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}
