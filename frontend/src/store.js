import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { customerReducer, shippingAddressReducer, userReducer } from './reducers/userReducer';
import alertReducer from './reducers/alertReducer';
import { bookDetailReducer, booksListReducer, categoryReducer, genreReducer } from './reducers/bookReducer';
import { cartReducer, orderDetailReducer, orderListReducer, placeOrderReducer, wishlistReducer } from './reducers/orderReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        customer: customerReducer,
        shippingAddress: shippingAddressReducer,
        alert: alertReducer,
        booksList: booksListReducer,
        bookDetail: bookDetailReducer,
        category: categoryReducer,
        genre: genreReducer,
        orderList: orderListReducer,
        orderDetail: orderDetailReducer,
        placeOrder: placeOrderReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
    },
    middleware: [thunk]
});

export default store;
