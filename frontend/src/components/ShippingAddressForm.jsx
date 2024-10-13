import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingAddress } from "../actions/userAction";

const ShippingAddressForm = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.shippingAddress);
  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);

  const [addressData, setAddressData] = useState({
    id: "",
    recipient_name: "",
    recipient_phone_number: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    is_delete: false,
    is_default: false,
  });
  const handleAddressChange = (address) => {
    const delete_address_checkbox = document.getElementById(
      "id_delete_address_checkbox"
    );
    // updatig existing address
    if (address) {
      setAddressData({
        id: address.id,
        recipient_name: address.recipient_name,
        recipient_phone_number: address.recipient_phone_number,
        street: address.street,
        city: address.city,
        state: address.state,
        postal_code: address.postal_code,
        is_delete: address.is_delete,
        is_default: address.is_default,
      });
      delete_address_checkbox.classList.remove("d-none");
    } else {
      // adding new address
      setAddressData({
        id: "",
        recipient_name: "",
        recipient_phone_number: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        is_delete: false,
        is_default: false,
      });
      delete_address_checkbox.classList.add("d-none");
    }
    setShowShippingAddressForm(true);
  };
  const closeShippingAddressForm = (event) => {
    event.preventDefault();
    setShowShippingAddressForm(false);
  };
  const handleShippingAddressFormSubmit = (event) => {
    const save_btn = document.getElementById("id_save_btn");
    const cancel_btn = document.getElementById("id_cancel_btn");
    event.preventDefault();
    save_btn.classList.add("loading");
    dispatch(updateShippingAddress(addressData)).then(() => {
      save_btn.classList.remove("loading");
      cancel_btn.click();
    });
  };
  React.useImperativeHandle(ref, () => ({
    handleAddressChange,
  }));

  return (
    <>
      <button
        className="btn-base btn-primary"
        onClick={() => handleAddressChange()}
      >
        <span className="material-icons">add</span>
        Add a new address
      </button>
      <form
        id="id_shipping_address_form"
        className={
          showShippingAddressForm ? "d-flex flex-column gap-20" : "d-none"
        }
        method="post"
        onSubmit={handleShippingAddressFormSubmit}
      >
        <div className="form-group">
          <label htmlFor="id_recipient_name" className="fw-semibold">
            Recipient name*
          </label>
          <input
            className="form-control"
            type="text"
            id="id_recipient_name"
            name="recipient_name"
            value={addressData.recipient_name}
            onChange={(event) =>
              setAddressData({
                ...addressData,
                recipient_name: event.target.value,
              })
            }
            required
          />
          {error && error.recipient_name ? (
            <label htmlFor="id_recipient_name" className="error">
              {error.recipient_name}
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="id_recipient_phone_number" className="fw-semibold">
            Recipient Phone Number*
          </label>
          <input
            className="form-control"
            type="tel"
            id="id_recipient_phone_number"
            name="recipient_phone_number"
            minLength="10"
            maxLength="10"
            value={addressData.recipient_phone_number}
            onChange={(event) =>
              setAddressData({
                ...addressData,
                recipient_phone_number: event.target.value,
              })
            }
            required
          />
          {error && error.recipient_phone_number ? (
            <label htmlFor="id_recipient_phone_number" className="error">
              {error.recipient_phone_number}
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="id_street" className="fw-semibold">
            Street*
          </label>
          <input
            className="form-control"
            type="text"
            id="id_street"
            name="street"
            value={addressData.street}
            onChange={(event) =>
              setAddressData({
                ...addressData,
                street: event.target.value,
              })
            }
            required
          />
          {error && error.street ? (
            <label htmlFor="id_street" className="error">
              {error.street}
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex flex-column flex-md-row gap-20 w-100">
          <div className="form-group">
            <label htmlFor="id_city" className="fw-semibold">
              City*
            </label>
            <input
              className="form-control"
              type="text"
              id="id_city"
              name="city"
              value={addressData.city}
              onChange={(event) =>
                setAddressData({
                  ...addressData,
                  city: event.target.value,
                })
              }
              required
            />
            {error && error.city ? (
              <label htmlFor="id_city" className="error">
                {error.city}
              </label>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="id_state" className="fw-semibold">
              State*
            </label>
            <input
              className="form-control"
              type="text"
              id="id_state"
              name="state"
              value={addressData.state}
              onChange={(event) =>
                setAddressData({
                  ...addressData,
                  state: event.target.value,
                })
              }
              required
            />
            {error && error.state ? (
              <label htmlFor="id_state" className="error">
                {error.state}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="id_postal_code" className="fw-semibold">
            Postal Code*
          </label>
          <input
            className="form-control"
            type="text"
            id="id_postal_code"
            name="postal_code"
            minLength="6"
            maxLength="6"
            value={addressData.postal_code}
            onChange={(event) =>
              setAddressData({
                ...addressData,
                postal_code: event.target.value,
              })
            }
            required
          />
          {error && error.postal_code ? (
            <label htmlFor="id_postal_code" className="error">
              {error.postal_code}
            </label>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex flex-wrap gap-20">
          <label
            id="id_set_default_address_checkbox"
            htmlFor="id_set_default_address"
            className="checkbox-label"
          >
            <input
              type="checkbox"
              name="is_default"
              id="id_set_default_address"
              checked={addressData.is_default}
              onChange={(event) => {
                setAddressData({
                  ...addressData,
                  is_default: event.target.checked,
                });
              }}
              hidden
            />
            <span className="checkmark"></span>
            <p className="align-items-center d-flex fw-medium">
              Set as deafult address
            </p>
          </label>
          <label
            id="id_delete_address_checkbox"
            htmlFor="id_is_delete"
            className="checkbox-label"
          >
            <input
              type="checkbox"
              name="is_delete"
              id="id_is_delete"
              checked={addressData.is_delete}
              onChange={(event) => {
                setAddressData({
                  ...addressData,
                  is_delete: event.target.checked,
                });
              }}
              hidden
            />
            <span className="checkmark"></span>
            <p className="align-items-center d-flex fw-medium">
              Delete this address
            </p>
          </label>
        </div>
        <div className="d-flex gap-20">
          <button
            type="submit"
            id="id_save_btn"
            className="btn-base btn-primary"
          >
            Save
          </button>
          <button
            id="id_cancel_btn"
            className="btn-base"
            onClick={closeShippingAddressForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
});

export default ShippingAddressForm;
