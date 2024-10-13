import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyCartItems, updateMyCart } from "../actions/orderAction";
import { Link } from "react-router-dom";
function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getMyCartItems());
  }, [dispatch]);
  return (
    <div className="container-xxl">
      <h2 className="fw-bold">Your Cart Items</h2>
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="flex-column d-flex table-with-no-pagination">
            <div className="table-loader loader"></div>
            <div className="table-responsive horizontal-scrollbar">
              <table className="table">
                <thead className="fw-medium">
                  <tr>
                    <th>S. No</th>
                    <th>Book</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ minWidth: 250 + "px" }}>
                        <Link
                          to={`/book/${item.book.id}/`}
                          className="btn-link fw-semibold text-theme"
                        >
                          {item.book.title}
                        </Link>
                      </td>
                      <td>₹ {item.book.price}</td>
                      <td>
                        <div className="qty-plus-minus">
                          <div
                            className="dec qtybutton"
                            onClick={() => {
                              if (item.quantity > 1) {
                                dispatch(
                                  updateMyCart(
                                    item.book.id,
                                    item.id,
                                    item.quantity - 1
                                  )
                                );
                              }
                            }}
                          >
                            <span className="material-icons">remove</span>
                          </div>
                          <input
                            className="qty-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            value={item.quantity}
                            readOnly
                          />
                          <div
                            className="inc qtybutton"
                            onClick={() =>
                              dispatch(
                                updateMyCart(
                                  item.book.id,
                                  item.id,
                                  item.quantity + 1
                                )
                              )
                            }
                          >
                            <span className="material-icons">add</span>
                          </div>
                        </div>
                      </td>
                      <td>₹ {item.total_price}</td>
                      <td>
                        <span
                          role="button"
                          className="material-icons-outlined"
                          onClick={() =>
                            dispatch(updateMyCart(item.book.id, item.id, true))
                          }
                        >
                          delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button className="btn-base btn-primary ml-auto">Place order</button>
        </>
      ) : (
        <div className="no-data-container">
          <span className="material-icons">production_quantity_limits</span>
          <h4>Your cart is empty</h4>
          <Link to="/" className="btn-base btn-primary">
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
