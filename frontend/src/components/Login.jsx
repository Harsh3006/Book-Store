import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import { showError } from "../actions/alertAction";

function Login() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const next = queryParams.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (access_token) {
      // login successfull
      if (next) {
        navigate(next);
      } else {
        navigate("/");
      }
    }
  }, [access_token]);
  const handleLogin = (event) => {
    const login_btn = document.getElementById("id_login_btn");
    event.preventDefault();
    login_btn.classList.add("loading");
    dispatch(login(email, password)).then(() => {
      login_btn.classList.remove("loading");
    });
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
        onSubmit={handleLogin}
      >
        <div className="d-flex flex-column gap-8">
          <h2 className="fw-semibold">Log In</h2>
          <p className="fw-medium">Welcome back! Please enter your details.</p>
        </div>
        <div className="d-flex flex-column w-100 gap-24">
          <div className="d-flex flex-column gap-20 w-100">
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
                required
                onChange={(event) => setEmail(event.target.value)}
              />
              {error && error.email ? (
                <label htmlFor="id_email" className="error">
                  {error.email}
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="id_password" className="fw-semibold">
                Password*
              </label>
              <div className="input-group-with-icon">
                <input
                  className="form-control"
                  type={passwordVisible ? "text" : "password"}
                  id="id_password"
                  name="password"
                  placeholder="Enter the password"
                  minLength="8"
                  autoComplete="current password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="input-icon">
                  <span
                    id="toggle_password_icon"
                    className="material-icons-outlined"
                    type="button"
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    {passwordVisible ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </div>
              {error && error.password ? (
                <label htmlFor="id_password" className="error">
                  {error.password}
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <Link className="btn-link">Forgot Password?</Link>
          <button
            id="id_login_btn"
            type="submit"
            className="w-100 btn-base btn-primary"
          >
            Sign In
          </button>
        </div>
        <p className="d-flex align-items-center gap-4">
          Does not have an account?
          <Link className="btn-link text-theme" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
