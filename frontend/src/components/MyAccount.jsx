import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import {
  getCustomerRecord,
  getShippingAddress,
  logout,
  updateCustomerRecord
} from "../actions/userAction";
import {
  getMyOrders,
  getMyWishlist,
  updateMyWishlist,
} from "../actions/orderAction";
import Pagination from "./Pagination";
import ShippingAddressForm from "./ShippingAddressForm";

function MyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Shows the correct active tab
  const [activeTab, setActiveTab] = useState("edit-profile");
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "saved-addresses" && !shipping_address) {
      dispatch(getShippingAddress());
    } else if (tab === "orders" && !orders) {
      dispatch(getMyOrders());
    } else if (tab === "wishlist" && !items) {
      dispatch(getMyWishlist());
    }
  };

  // Handle customer record logic
  useEffect(() => {
    dispatch(getCustomerRecord());
  }, [dispatch]);
  const { profile_details, profile_picture, error } = useSelector(
    (state) => state.customer
  );
  const [profilePicture, setProfilePicture] = useState(profile_picture);
  const [customerRecord, setCustomerRecord] = useState(profile_details);
  useEffect(() => {
    setCustomerRecord(profile_details);
    setProfilePicture(profile_picture);
  }, [profile_details, profile_picture]);
  const handleCustomerRecordChange = (event) => {
    const { name, value } = event.target;
    const updatedState = { ...customerRecord };
    updatedState[name] = value;
    setCustomerRecord(updatedState);
  };
  const handleCustomerRecordFormSubmit = (event) => {
    const update_btn = document.getElementById("id_update_btn");
    event.preventDefault();
    update_btn.classList.add("loading");
    const form_data = new FormData(event.target);
    dispatch(updateCustomerRecord(form_data)).then(() => {
      update_btn.classList.remove("loading");
    });
  };

  // Handle shipping address logic
  const { shipping_address } = useSelector((state) => state.shippingAddress);
  const editAddressRef = useRef(null);
  const editShippingAddress = (address) => {
    editAddressRef.current.handleAddressChange(address);
  };

  // Handle order logic
  const { count, currentPage, totalPages, orders } = useSelector(
    (state) => state.orderList
  );
  const hadleOrderPageChange = (page_no) => {
    if (page_no !== currentPage) {
      dispatch(getMyOrders({ page: page_no }));
    }
  };

  const { items } = useSelector((state) => state.wishlist);
  return (
    <div className="container-xxl">
      <h2 className="fw-bold">My Account</h2>
      <div className="d-flex align-items-start flex-column flex-md-row gap-20 w-100">
        <div
          id="id_side_navbar"
          className="d-flex align-items-center flex-column gap-24"
        >
          <div className="profile-picture">
            {profilePicture ? (
              <img src={profilePicture} alt={customerRecord.first_name} />
            ) : (
              <span className="material-icons-outlined">account_circle</span>
            )}
          </div>
          <nav className="navbar w-100">
            <ul className="navbar-nav gap-12 w-100">
              <li
                className={classnames("nav-item btn-base", {
                  active: activeTab === "edit-profile",
                })}
                type="button"
                onClick={() => handleActiveTabChange("edit-profile")}
              >
                <span className="material-icons-outlined">person</span>
                Edit Profile
              </li>
              <li
                className={classnames("nav-item btn-base", {
                  active: activeTab === "saved-addresses",
                })}
                type="button"
                onClick={() => handleActiveTabChange("saved-addresses")}
              >
                <span className="material-icons-outlined">location_on</span>
                Saved Addresses
              </li>
              <li
                className={classnames("nav-item btn-base", {
                  active: activeTab === "orders",
                })}
                type="button"
                onClick={() => handleActiveTabChange("orders")}
              >
                <span className="material-icons-outlined">inventory_2</span>
                Orders
              </li>
              <li
                className={classnames("nav-item btn-base", {
                  active: activeTab === "wishlist",
                })}
                type="button"
                onClick={() => handleActiveTabChange("wishlist")}
              >
                <span className="material-icons-outlined">favorite_border</span>
                Wishlist
              </li>
              <li
                className="nav-item btn-base"
                type="button"
                onClick={() => {
                  navigate("/");
                  dispatch(logout());
                }}
              >
                <span className="material-icons-outlined">logout</span>
                Log Out
              </li>
            </ul>
          </nav>
        </div>
        <div className="account-content">
          <div
            className={
              activeTab === "edit-profile"
                ? "d-flex flex-column gap-24"
                : "d-none"
            }
          >
            <h3 className="fw-semibold">My Details</h3>
            <form
              className="d-flex flex-column gap-20"
              onSubmit={handleCustomerRecordFormSubmit}
            >
              <div className="d-flex flex-column flex-md-row gap-20 w-100">
                <div className="form-group">
                  <label htmlFor="id_first_name" className="fw-semibold">
                    First Name*
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="id_first_name"
                    name="first_name"
                    value={customerRecord.first_name}
                    onChange={handleCustomerRecordChange}
                    required
                  />
                  {error && error.first_name ? (
                    <label htmlFor="id_first_name" className="error">
                      {error.first_name}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="id_last_name" className="fw-semibold">
                    Last Name*
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="id_last_name"
                    name="last_name"
                    value={customerRecord.last_name}
                    onChange={handleCustomerRecordChange}
                    required
                  />
                  {error && error.last_name ? (
                    <label htmlFor="id_last_name" className="error">
                      {error.last_name}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="id_email" className="fw-semibold">
                  Email*
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="id_email"
                  name="email"
                  value={customerRecord.email}
                  required
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="id_dob" className="fw-semibold">
                  Date of Birth*
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="id_dob"
                  name="dob"
                  value={customerRecord.dob}
                  onChange={handleCustomerRecordChange}
                  required
                />
                {error && error.dob ? (
                  <label htmlFor="id_dob" className="error">
                    {error.dob}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="id_phone_number" className="fw-semibold">
                  Phone Number*
                </label>
                <input
                  className="form-control"
                  type="tel"
                  id="id_phone_number"
                  name="phone_number"
                  minLength="10"
                  maxLength="10"
                  value={customerRecord.phone_number}
                  onChange={handleCustomerRecordChange}
                  required
                />
                {error && error.phone_number ? (
                  <label htmlFor="id_phone_number" className="error">
                    {error.phone_number}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="id_profile_picture" className="fw-semibold">
                  Profile Picture
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  id="id_profile_picture"
                  name="profile_picture"
                />
                {error && error.profile_picture ? (
                  <label htmlFor="id_profile_picture" className="error">
                    {error.profile_picture}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <button
                id="id_update_btn"
                type="submit"
                className="btn-base btn-primary"
              >
                Update
              </button>
            </form>
          </div>
          <div
            className={
              activeTab === "saved-addresses"
                ? "d-flex flex-column gap-24"
                : "d-none"
            }
          >
            <h3 className="fw-semibold">Shipping Address</h3>
            <ShippingAddressForm ref={editAddressRef} />
            {shipping_address && shipping_address.length > 0
              ? shipping_address.map((address) => (
                  <div className="address" key={address.id}>
                    <div className="d-flex flex-column gap-4">
                      <div className="d-flex gap-16">
                        <p className="fw-semibold">{address.recipient_name}</p>
                        {address.is_default ? (
                          <p className="text-theme fw-semibold">Default</p>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>{address.recipient_phone_number}</p>
                      <p>
                        {address.street}, {address.city}, {address.state}
                      </p>
                      <p>{address.postal_code}</p>
                    </div>
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
          <div
            className={
              activeTab === "orders" ? "d-flex flex-column gap-24" : "d-none"
            }
          >
            <h3 className="fw-semibold">My Orders</h3>
            {orders && orders.length > 0 ? (
              <div className="flex-column d-flex table-with-pagination">
                <p className="fw-medium">Total number of orders {count}</p>
                <div className="table-loader loader"></div>
                <div className="table-responsive horizontal-scrollbar">
                  <table className="table">
                    <thead className="fw-medium">
                      <tr>
                        <th>Order Id</th>
                        <th>Ordered At</th>
                        <th>Total Amount</th>
                        <th>Paid</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td className="text-nowrap">{order.ordered_at}</td>
                          <td>{order.total_amount}</td>
                          <td>
                            {order.is_paid ? (
                              <span className="material-icons text-success">
                                check_circle
                              </span>
                            ) : (
                              <span className="material-icons text-danger">
                                cancel
                              </span>
                            )}
                          </td>
                          <td>{order.status}</td>
                          <td>
                            <Link
                              to={`/my_orders/${order.id}`}
                              className="btn-base btn-tertiary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={hadleOrderPageChange}
                />
              </div>
            ) : (
              <div className="no-data-container">
                <span className="material-icons">interests</span>
                <h5>You haven't ordred anything yet!</h5>
                <Link to="/" className="btn-base btn-primary">
                  Order Now
                </Link>
              </div>
            )}
          </div>
          <div
            className={
              activeTab === "wishlist" ? "d-flex flex-column gap-24" : "d-none"
            }
          >
            <h3 className="fw-semibold">My Wishlist</h3>
            {items && items.length > 0 ? (
              <div className="row m-0 w-100">
                {items.map((item) => (
                  <div className="book col-sm-6 col-lg-4" key={item.id}>
                    <div className="image position-relative">
                      <img src={item.cover_image} alt={item.title} />
                      <Link
                        to={`/book/${item.id}`}
                        className="btn-base btn-secondary"
                      >
                        Quick View
                      </Link>
                    </div>
                    <div className="d-flex gap-4 justify-content-between">
                      <div className="d-flex flex-column gap-4">
                        <Link to={`/book/${item.id}`} className="btn-link">
                          {item.title}
                        </Link>
                        <p className="fw-medium">₹ {item.price}</p>
                      </div>
                      <span
                        role="button"
                        className="material-icons-outlined"
                        onClick={() =>
                          dispatch(updateMyWishlist(item.id, true))
                        }
                      >
                        delete
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-container">
                <span className="material-icons">heart_broken</span>
                <h5>Your wishlist is empty!</h5>
                <Link to="/" className="btn-base btn-primary">
                  Add Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
