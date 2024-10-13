import { CartActionTypes, OrderActionTypes, WishlistActionTypes } from '../constants/orderConstants';

export const orderListReducer = (state = {
    count: 0, currentPage: 1, totalPages: 1, orders: null, error: null
}, action) => {
    switch (action.type) {
        case OrderActionTypes.ORDER_LIST_SUCCESS:
            return {
                ...state,
                count: action.payload.count,
                currentPage: action.payload.current_page,
                totalPages: action.payload.total_pages,
                orders: action.payload.data,
                error: null
            };
        case OrderActionTypes.ORDER_LIST_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export const orderDetailReducer = (state = { order: {}, error: null }, action) => {
    switch (action.type) {
        case OrderActionTypes.ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                order: action.payload,
                error: null
            }
        case OrderActionTypes.ORDER_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const placeOrderReducer = (state = { selectedBooks: [] }, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const wishlistReducer = (state = { items: null, error: null }, action) => {
    switch (action.type) {
        case WishlistActionTypes.WHISHLIST_GET_SUCCES:
            return {
                ...state,
                items: action.payload,
                error: null
            }
        case WishlistActionTypes.WHISHLIST_GET_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const cartReducer = (state = { cartItems: null, error: null }, action) => {
    switch (action.type) {
        case CartActionTypes.CART_GET_SUCCESS:
            return {
                ...state,
                cartItems: action.payload,
                error: null
            }
        case CartActionTypes.CART_GET_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
