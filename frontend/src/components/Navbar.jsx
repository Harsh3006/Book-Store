import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { access_token } = useSelector((state) => state.user);

  return (
    <>
      <nav id="id_top_navbar" className="navbar navbar-expand sticky-top">
        <ul className="navbar-nav w-100 justify-content-center gap-24">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              <span className="material-icons">home</span>
              <p className="d-none d-sm-block">Home</p>
            </NavLink>
          </li>
          {access_token ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <span className="material-icons">shopping_cart</span>
                  <p className="d-none d-sm-block">Cart</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/my_account">
                  <span className="material-icons">account_circle</span>
                  <p className="d-none d-sm-block">My Account</p>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <span className="material-icons">login</span>
                  <p className="d-none d-sm-block">Login</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  <span className="material-icons">person_add</span>
                  <p className="d-none d-sm-block">Sign Up</p>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
