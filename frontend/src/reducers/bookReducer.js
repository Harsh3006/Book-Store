import { BooksActionTypes } from "../constants/bookConstants";


export const booksListReducer = (state = {
    count: 0, currentPage: 1, totalPages: 1, books: [], error: null
}, action) => {

    switch (action.type) {
        case BooksActionTypes.BOOKS_LIST_SUCCESS:
            return {
                ...state,
                count: action.payload.count,
                currentPage: action.payload.current_page,
                totalPages: action.payload.total_pages,
                books: action.payload.data,
                error: null
            };
        case BooksActionTypes.BOOKS_LIST_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}

export const bookDetailReducer = (state = { book: {}, error: null }, action) => {
    switch (action.type) {
        case BooksActionTypes.BOOKS_DETAILS_SUCCESS:
            return {
                ...state,
                book: action.payload,
                error: null
            };
        case BooksActionTypes.BOOKS_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const categoryReducer = (state = { categories: [], error: null }, action) => {
    switch (action.type) {
        case BooksActionTypes.BOOKS_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                error: null
            }
        case BooksActionTypes.BOOKS_CATEGORIES_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const genreReducer = (state = { genres: [], error: null }, action) => {
    switch (action.type) {
        case BooksActionTypes.BOOKS_GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload,
                error: null
            }
        case BooksActionTypes.BOOKS_GENRES_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
