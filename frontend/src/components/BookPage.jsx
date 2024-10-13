import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails } from "../actions/bookAction";
import { showWarning } from "../actions/alertAction";
import axiosInstance from "../axiosInstance";
import { updateMyCart } from "../actions/orderAction";
import Rating from "./Rating";

function BookPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { book } = useSelector((state) => state.bookDetail);
  const { access_token } = useSelector((state) => state.user);
  const [inCart, setInCart] = useState(false);
  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [id, dispatch]);
  const checkIsInCart = async () => {
    try {
      const { data } = await axiosInstance.post("user/in_cart/", {
        book_id: id,
      });
      setInCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (access_token) {
      checkIsInCart();
    }
  }, [id, access_token]);
  const handleAddToCart = (book_id) => {
    if (access_token) {
      dispatch(updateMyCart(book_id)).then(() => {
        checkIsInCart();
      });
    } else {
      dispatch(showWarning("Please login first!"));
      navigate(`/login?next=/book/${id}`);
    }
  };
  const handleBuyNow = () => {
    navigate("/place_order");
  };
  return (
    <>
      <div className="container-xxl">
        <div className="d-flex flex-column flex-md-row gap-32 w-100">
          <div className="cover-image">
            <img src={book.cover_image} alt={book.title} />
          </div>
          <div className="d-flex flex-column gap-16 w-100">
            <div className="d-flex flex-column gap-6">
              <h2 className="fw-semibold">{book.title}</h2>
              <h5 className="fw-medium">By {book.author}</h5>
              <Rating customer_rating={book.customer_rating} />
            </div>
            <p className="fw-semibold">₹ {book.price}</p>
            <p className="fw-medium">Published on {book.publication_date}</p>
            <p>{book.description}</p>
            <div className="d-flex gap-16">
              {inCart ? (
                <Link to="/cart" className="btn-base btn-primary">
                  Go to cart
                </Link>
              ) : (
                <button
                  className="btn-base btn-primary"
                  onClick={() => handleAddToCart(book.id)}
                >
                  Add to cart
                </button>
              )}
              <button
                to="/place_order"
                className="btn-base btn-primary"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPage;
