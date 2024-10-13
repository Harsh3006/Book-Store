import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../actions/orderAction";

function OrderDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { order } = useSelector((state) => state.orderDetail);
  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);

  return (
    <div className="container-xxl">
      {order && (
        <>
          <p className="fw-bold">Order Id: {id}</p>
          <div className="divider"></div>
          <div className="d-flex flex-column gap-12 w-100">
            {order.order_items &&
              order.order_items.map((item, index) => (
                <div
                  className="d-flex justify-content-between gap-20"
                  key={index}
                >
                  <div className="d-flex gap-8 flex-column">
                    <Link to={`/book/${item.book.id}`}>
                      <p className="fw-semibold text-theme">
                        {item.book.title}
                      </p>
                    </Link>
                    <p className="fw-medium">{item.book.author}</p>
                    <p>Unit Price: ₹ {item.unit_price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Sub Total: ₹ {item.total_price}</p>
                  </div>
                  <img
                    src={item.book.cover_image}
                    alt={item.book.title}
                    style={{ height: 200 + "px", width: "max-content" }}
                  />
                </div>
              ))}
          </div>
          <div className="divider"></div>
          <div className="d-flex flex-column gap-16 fw-medium">
            <div className="order-update">
              <span className="order-update-marker success"></span>
              <div className="d-flex flex-column gap-4">
                <p className="fw-semibold">Order Placed</p>
                <p>Your order has been placed.</p>
                <p>{order.ordered_at}</p>
              </div>
            </div>
            <div className="order-update">
              {order.shipped_at ? (
                <>
                  <span className="order-update-marker success"></span>
                  <div className="d-flex flex-column gap-4">
                    <p className="fw-semibold">Order Shipped</p>
                    <p>Your order has been shipped.</p>
                    <p>{order.shipped_at}</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="order-update-marker warning"></span>
                  <div className="d-flex flex-column gap-4">
                    <p className="fw-semibold">Shippment Pending</p>
                    <p>Your order has not been shipped yet.</p>
                    <p>
                      We are proccessing your order, it will be shipped to your
                      nearest hub soon.
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="order-update">
              {order.delivered_at ? (
                <>
                  <span className="order-update-marker success"></span>
                  <div className="d-flex flex-column gap-4">
                    <p className="fw-semibold">Delivered</p>
                    <p>Your order has been delivered.</p>
                    <p> {order.delivered_at}</p>
                  </div>
                </>
              ) : (
                <>
                  <span className="order-update-marker warning"></span>
                  <div className="d-flex flex-column gap-4">
                    <p className="fw-semibold">Delivery Pending</p>
                    <p>Your order has not been delivered yet.</p>
                    <p>
                      We are proccessing your order, it will be delivered to
                      your address soon.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="divider"></div>
          <p className="fw-semibold">Shipping Details</p>
          {order.shipped_address && (
            <div className="d-flex flex-column gap-2 fw-medium">
              <p>{order.shipped_address.recipient_name}</p>
              <p>{order.shipped_address.street}</p>
              <p>
                {order.shipped_address.city}, {order.shipped_address.state} -
                {order.shipped_address.postal_code}
              </p>
              <p>Phone nmber: {order.shipped_address.recipient_phone_number}</p>
            </div>
          )}
          <div className="divider"></div>
          <p className="fw-semibold">Payment Details</p>
          <div className="d-flex flex-column gap-2 fw-medium">
            <p>Payment Method: {order.payment_method}</p>
            <p>Delivery Charges: {order.delivery_charge}</p>
            <p>Total Amount: ₹ {order.total_amount}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderDetailPage;
