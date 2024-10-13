import { BooksActionTypes } from "../constants/bookConstants";
import axiosInstance from "../axiosInstance";

export const fetchBooks = (filters = {}) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('books/all_books/', {
            params: filters,
            withCredentials: false
        });
        dispatch({
            type: BooksActionTypes.BOOKS_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BooksActionTypes.BOOKS_LIST_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const fetchBookDetails = (book_id) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get(`books/${book_id}/`, {
            withCredentials: false
        });
        dispatch({
            type: BooksActionTypes.BOOKS_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BooksActionTypes.BOOKS_DETAILS_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('books/all_categories/', {
            withCredentials: false
        });
        dispatch({
            type: BooksActionTypes.BOOKS_CATEGORIES_SUCCESS,
            payload: data.categories
        })
    } catch (error) {
        dispatch({
            type: BooksActionTypes.BOOKS_CATEGORIES_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const fetchGenres = () => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get('books/all_genres/', {
            withCredentials: false
        });
        dispatch({
            type: BooksActionTypes.BOOKS_GENRES_SUCCESS,
            payload: data.genres
        });
    } catch (error) {
        dispatch({
            type: BooksActionTypes.BOOKS_GENRES_FAILURE,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}
