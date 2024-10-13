import { CartActionTypes, OrderActionTypes, WishlistActionTypes } from "../constants/orderConstants";
import axiosInstance from "../axiosInstance"
import { showSuccess } from "./alertAction";

export const getMyOrders = (params = {}) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("orders/my_orders/", {
            params: params
        });
        console.log(data)
        dispatch({
            type: OrderActionTypes.ORDER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: OrderActionTypes.ORDER_LIST_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    const order_id = parseInt(id.slice(2));
    try {
        const { data } = await axiosInstance.get(`orders/${order_id}/`);
        dispatch({
            type: OrderActionTypes.ORDER_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: OrderActionTypes.ORDER_DETAIL_FAILURE,
            pylaod: error.response && error.response.data
                ? error.response.data
                : error.message
        })
    }
}

export const getMyWishlist = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get("user/my_wishlist/");
        dispatch({
            type: WishlistActionTypes.WHISHLIST_GET_SUCCES,
            payload: data.books
        });
    } catch (error) {
        dispatch({
            type: WishlistActionTypes.WHISHLIST_GET_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        })
    }
}

export const updateMyWishlist = (book_id, remove = false) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post("user/my_wishlist/", {
            book_id: book_id,
            remove: remove
        });
        dispatch({
            type: WishlistActionTypes.WISHLIST_UPDATE_SUCCESS,
        });
        dispatch(showSuccess(data));
        dispatch(getMyWishlist());
    } catch (error) {
        dispatch({
            type: WishlistActionTypes.WISHLIST_UPDATE_FAILURE,
            pylaod: error.response && error.response.data
                ? error.response.data
                : error.message
        });
    }
}

export const getMyCartItems = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('user/my_cart/');
        console.log(data)
        dispatch({
            type: CartActionTypes.CART_GET_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CartActionTypes.CART_GET_FAILURE,
            payload: error.response && error.response.data
                ? error.response.data
                : error.message
        })
    }
}

export const updateMyCart = (
    book_id, cart_item_id = '', quantity = '', is_delete = false) => async (dispatch) => {
        try {
            const { data } = await axiosInstance.post('user/my_cart/', {
                book_id: book_id,
                cart_item_id: cart_item_id,
                quantity: quantity,
                is_delete: is_delete
            });
            dispatch({
                type: CartActionTypes.CART_UPDATE_SUCCESS
            })
            dispatch(showSuccess(data));
            dispatch(getMyCartItems());
        } catch (error) {
            dispatch({
                type: CartActionTypes.CART_UPDATE_FAILURE,
                payload: error.response && error.response.data
                    ? error.response.data
                    : error.message
            })
        }
    }
