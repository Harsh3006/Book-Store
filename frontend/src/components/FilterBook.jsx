import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../actions/bookAction";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { getMyWishlist, updateMyWishlist } from "../actions/orderAction";
import { showWarning } from "../actions/alertAction";
import Rating from "./Rating";

function FilterBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { access_token } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.wishlist);
  const { count, currentPage, totalPages, books } = useSelector(
    (state) => state.booksList
  );
  // Fetching books
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  // Check for wishlist data
  useEffect(() => {
    if (access_token) {
      dispatch(getMyWishlist());
    }
  }, [access_token, dispatch]);
  const handleWishlistChange = (book_id, remove = false) => {
    if (access_token) {
      dispatch(updateMyWishlist(book_id, remove));
    } else {
      dispatch(showWarning("Please login first!"));
      navigate("/login");
    }
  };
  const handlePageChange = (page_no) => {
    if (currentPage !== page_no) {
      dispatch(fetchBooks({ page: page_no }));
    }
  };
  return (
    <div className="container-xxl">
      <h2 className="fw-bold">Featured Books</h2>
      <p className="fw-medium">Total number of books {count}</p>
      <Filters />
      <div className="d-flex flex-column gap-20 w-100">
        <div className="row m-0 w-100">
          {books.map((book) => (
            <div className="book col-sm-6 col-md-4 col-lg-3" key={book.id}>
              <div className="image position-relative">
                <img src={book.cover_image} alt={book.title} />
                <Link
                  to={`/book/${book.id}`}
                  className="btn-base btn-secondary"
                >
                  Quick View
                </Link>
              </div>
              <div className="d-flex gap-4 align-items-start justify-content-between">
                <div className="d-flex flex-column gap-4">
                  <Link to={`/book/${book.id}`} className="btn-link">
                    {book.title}
                  </Link>
                  <Rating customer_rating={book.customer_rating} />
                  <p className="fw-medium">₹ {book.price}</p>
                </div>
                {items && items.some((item) => item.id === book.id) ? (
                  <span
                    role="button"
                    className="material-icons text-theme"
                    onClick={() => handleWishlistChange(book.id, true)}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    role="button"
                    className="material-icons"
                    onClick={() => handleWishlistChange(book.id)}
                  >
                    favorite_outline
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default FilterBook;
