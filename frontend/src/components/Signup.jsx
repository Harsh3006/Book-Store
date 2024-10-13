import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import { showError, showWarning } from "../actions/alertAction";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (access_token) {
      // Successful registration and login
      navigate("/");
    }
  }, [access_token, navigate]);
  const handleSignUp = (event) => {
    const sign_up_btn = document.getElementById("id_signup_btn");
    event.preventDefault();
    if (password === confirmPassword) {
      sign_up_btn.classList.add("loading");
      dispatch(register(firstName, lastName, email, password)).then(() => {
        sign_up_btn.classList.remove("loading");
      });
    } else {
      dispatch(showWarning("Both password must be same."));
    }
  };
  useEffect(() => {
    if (error && error.non_field_errors) {
      dispatch(showError(error.non_field_errors));
    }
  }, [error]);
  return (
    <div className="user-form-container">
      <form
        className="w-100 d-flex flex-column gap-32"
        method="POST"
        onSubmit={handleSignUp}
      >
        <div className="d-flex flex-column gap-8">
          <h2 className="fw-semibold">Sign Up</h2>
          <p className="fw-medium">Create your account!</p>
        </div>
        <div className="d-flex flex-column w-100 gap-24">
          <div className="d-flex flex-column gap-20 w-100">
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
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
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
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
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
                placeholder="Enter your email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              {error && (error.username || error.email) ? (
                <label htmlFor="id_email" className="error">
                  {error.email}
                  {error.username}
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="id_password" className="fw-semibold">
                Password*
              </label>
              <input
                className="form-control"
                type="password"
                id="id_password"
                name="password"
                placeholder="Enter the password"
                minLength="8"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                autoComplete="new password"
                required
              />
              {error && error.password ? (
                <label htmlFor="id_password" className="error">
                  {error.password}
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="id_confirm_password" className="fw-semibold">
                Confirm Password*
              </label>
              <input
                className="form-control"
                type="password"
                id="id_confirm_password"
                name="confirm_password"
                placeholder="Enter same password as before"
                minLength="8"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                autoComplete="new-password"
                required
              />
            </div>
          </div>
          <button
            id="id_signup_btn"
            type="submit"
            className="w-100 btn-base btn-primary"
          >
            Create Account
          </button>
        </div>
        <p className="d-flex align-items-center gap-4">
          Already have an account?
          <Link className="btn-link text-theme" to="/login">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
