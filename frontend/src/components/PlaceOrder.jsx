import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShippingAddressForm from "./ShippingAddressForm";
import { getShippingAddress } from "../actions/userAction";
import { showWarning } from "../actions/alertAction";
import Rating from "./Rating";
import { useLocation } from "react-router-dom";

function PlaceOrder() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { shipping_address } = useSelector((state) => state.shippingAddress);
  const [chosenAddress, setChosenAddress] = useState(null);
  const [showChangeAddress, setShowChangeAddress] = useState(false);
  const selectedBooks = null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  useEffect(() => {
    dispatch(getShippingAddress());
  }, [dispatch]);
  useEffect(() => {
    if (shipping_address) {
      setChosenAddress(
        shipping_address.find((address) => address.is_default === true)
      );
    }
  }, [shipping_address]);
  const editAddressRef = useRef(null);
  const editShippingAddress = (address) => {
    editAddressRef.current.handleAddressChange(address);
  };
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };
  const handlePlaceOrder = () => {
    const contiue_btn = document.getElementById("id_continue_btn");
    if (!chosenAddress) {
      dispatch(showWarning("Please add an address to deliver your order."));
      return;
    }
    if (!selectedPaymentMethod) {
      dispatch(
        showWarning("Please choose a payment method from given options.")
      );
      return;
    }
    contiue_btn.classList.add("loading");
  };

  return (
    <div className="container-xxl">
      <div className="d-flex flex-column gap-20 w-100">
        <div className="place-order-steps">
          <span className="small-feature-icon">1</span>
          <div className="d-flex flex-column gap-20 flex-grow-1">
            <h4>Shipping Address</h4>
            <ShippingAddressForm ref={editAddressRef} />
            <div
              className={
                showChangeAddress ? "d-flex flex-column gap-20" : "d-none"
              }
            >
              {shipping_address && shipping_address.length > 0
                ? shipping_address.map((address) => (
                    <div className="address" key={address.id}>
                      <label
                        htmlFor={`id_address_${address.id}`}
                        className="radio-label"
                      >
                        <input
                          type="radio"
                          name="chosen_address"
                          id={`id_address_${address.id}`}
                          value={address.id}
                          checked={
                            chosenAddress && chosenAddress.id
                              ? chosenAddress.id === address.id
                              : false
                          }
                          onChange={() => setChosenAddress(address)}
                          hidden
                        />
                        <span className="radiomark"></span>
                        <div className="d-flex flex-column gap-4">
                          <p className="fw-semibold">
                            {address.recipient_name}
                          </p>
                          <p>{address.recipient_phone_number}</p>
                          <p>
                            {address.street}, {address.city}, {address.state}
                          </p>
                          <p>{address.postal_code}</p>
                        </div>
                      </label>
                      <span
                        type="button"
                        className="material-icons-outlined"
                        onClick={() => editShippingAddress(address)}
                      >
                        edit
                      </span>
                    </div>
                  ))
                : ""}
            </div>
            {chosenAddress && chosenAddress.id ? (
              <div className="d-flex justify-content-between gap-20">
                <div className="d-flex flex-column gap-4">
                  <p className="fw-semibold">{chosenAddress.recipient_name}</p>
                  <p>{chosenAddress.recipient_phone_number}</p>
                  <p>
                    {chosenAddress.street}, {chosenAddress.city},
                    {chosenAddress.state}
                  </p>
                  <p>{chosenAddress.postal_code}</p>
                </div>
                <button
                  className="btn-base btn-primary"
                  onClick={() => setShowChangeAddress(!showChangeAddress)}
                >
                  {showChangeAddress ? "Close" : "Change"}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="place-order-steps">
          <span className="small-feature-icon">2</span>
          <div className="d-flex flex-column gap-20">
            <h4>Order Item(s)</h4>
            <div className="d-flex gap-20">
              <div className="d-flex flex-column gap-12">
                {selectedBooks && selectedBooks.length > 0
                  ? selectedBooks.map((item) => (
                      <>
                        <img src={item.cover_image} alt={item.title} />
                        <div className="qty-plus-minus">
                          <div
                            className="dec qtybutton"
                            // onClick={() => {
                            //   if (item.quantity > 1) {
                            //     dispatch(
                            //       updateMyCart(item.book.id, item.id, item.quantity - 1)
                            //     );
                            //   }
                            // }}
                          >
                            <span className="material-icons">remove</span>
                          </div>
                          <input
                            className="qty-plus-minus-box"
                            type="text"
                            name="qtybutton"
                            // value={item.quantity}
                            readOnly
                          />
                          <div
                            className="inc qtybutton"
                            // onClick={() =>
                            //   dispatch(
                            //     updateMyCart(item.book.id, item.id, item.quantity + 1)
                            //   )
                            // }
                          >
                            <span className="material-icons">add</span>
                          </div>
                        </div>
                      </>
                    ))
                  : ""}
              </div>
              <div className="d-flex flex-column gap-8">
                <p className="fw-semibold">Book Title</p>
                <Rating customer_rating={3} />
                <p>price</p>
              </div>
            </div>
          </div>
        </div>
        <div className="place-order-steps">
          <span className="small-feature-icon">3</span>
          <div className="d-flex flex-column gap-12">
            <h4>Price Details</h4>
            <p>Item Price: </p>
            <p>Delivery Charges: </p>
            <p className="fw-semibold">Total Amount: </p>
          </div>
        </div>
        <div className="place-order-steps">
          <span className="small-feature-icon">4</span>
          <div className="d-flex flex-column gap-20">
            <h4>Payment Options</h4>
            <label htmlFor="id_payment_option_upi" className="radio-label">
              <input
                type="radio"
                name="payment_method"
                id="id_payment_option_upi"
                value="UPI"
                checked={selectedPaymentMethod === "UPI"}
                onChange={handlePaymentMethodChange}
                hidden
              />
              <span className="radiomark"></span>
              UPI
            </label>
            <label
              htmlFor="id_payment_option_debit_card"
              className="radio-label"
            >
              <input
                type="radio"
                name="payment_method"
                id="id_payment_option_debit_card"
                value="Debit Card"
                checked={selectedPaymentMethod === "Debit Card"}
                onChange={handlePaymentMethodChange}
                hidden
              />
              <span className="radiomark"></span>
              Debit Card
            </label>
            <label
              htmlFor="id_payment_option_credit_card"
              className="radio-label"
            >
              <input
                type="radio"
                name="payment_method"
                id="id_payment_option_credit_card"
                value="Credit Card"
                checked={selectedPaymentMethod === "Credit Card"}
                onChange={handlePaymentMethodChange}
                hidden
              />
              <span className="radiomark"></span>
              Credit Card
            </label>
            <label
              htmlFor="id_payment_option_net_banking"
              className="radio-label"
            >
              <input
                type="radio"
                name="payment_method"
                id="id_payment_option_net_banking"
                value="Net Banking"
                checked={selectedPaymentMethod === "Net Banking"}
                onChange={handlePaymentMethodChange}
                hidden
              />
              <span className="radiomark"></span>
              Net Banking
            </label>
            <label htmlFor="id_payment_option_cod" className="radio-label">
              <input
                type="radio"
                name="payment_method"
                id="id_payment_option_cod"
                value="Cash on Delivery"
                checked={selectedPaymentMethod === "Cash on Delivery"}
                onChange={handlePaymentMethodChange}
                hidden
              />
              <span className="radiomark"></span>
              Cash on Delivery
            </label>
          </div>
        </div>
      </div>
      <button
        id="id_continue_btn"
        className="btn-base btn-primary ml-auto"
        onClick={handlePlaceOrder}
      >
        Continue
      </button>
    </div>
  );
}

export default PlaceOrder;
