import { CLEAR_ERROR } from '../constants/alertConstants';
import { CustomerActionTypes, ShippingAddressActionTypes, UserActionTypes } from '../constants/userConstants';

export const userReducer = (state = {
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    error: null,
}, action) => {

    switch (action.type) {
        case UserActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                error: null,
            };
        case UserActionTypes.USER_LOGIN_FAILURE:
        case UserActionTypes.USER_REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case UserActionTypes.USER_LOGOUT:
            return {
                ...state,
                access_token: null,
                refresh_token: null,
            };
        case UserActionTypes.USER_REGISTER_SUCCESS:
            return state
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

export const customerReducer = (state = {
    profile_details: { email: '', first_name: '', last_name: '', dob: '', phone_number: '' },
    profile_picture: '', error: null
}, action) => {

    switch (action.type) {
        case CustomerActionTypes.CUSTOMER_RECORD_GET_SUCCESS:
            return {
                ...state,
                profile_details: {
                    email: action.payload.user.email,
                    first_name: action.payload.user.first_name,
                    last_name: action.payload.user.last_name,
                    dob: action.payload.dob,
                    phone_number: action.payload.phone_number,
                },
                profile_picture: action.payload.profile_picture,
                error: null
            };
        case CustomerActionTypes.CUSTOMER_RECORD_GET_FAILURE:
        case CustomerActionTypes.CUSTOMER_RECORD_UPDATE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case CustomerActionTypes.CUSTOMER_RECORD_UPDATE_SUCCESS:
            return state
        default:
            return state
    }
}

export const shippingAddressReducer = (state = { shipping_address: null, error: null }, action) => {
    switch (action.type) {
        case ShippingAddressActionTypes.SHIPPING_ADDRESS_GET_SUCCESS:
            return {
                ...state,
                shipping_address: action.payload,
                error: null
            }
        case ShippingAddressActionTypes.SHIPPING_ADDRESS_GET_FAILURE:
        case ShippingAddressActionTypes.SHIPPING_ADDRESS_UPDATE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case ShippingAddressActionTypes.SHIPPING_ADDRESS_UPDATE_SUCCESS:
            return state
        default:
            return state
    }
}
