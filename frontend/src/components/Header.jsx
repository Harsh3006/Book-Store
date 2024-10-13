import { Link } from "react-router-dom";

function Header() {

  return (
    <div className="header d-flex align-items-center flex-column justify-content-center">
      <Link className="navbar-brand" to="/">
        books.
      </Link>
      <div className="d-flex flex-column gap-8 text-center">
        <h1 className="fw-bold">Find book you wanna read today!</h1>
        <h3><span className="fw-bold text-theme">Various categories</span> at one place</h3>
      </div>
      <div className="w-100 features-container">
        <div className="d-flex align-items-center gap-16">
          <span className="material-icons feature-icon">local_shipping</span>
          <div className="d-flex flex-column gap-8">
            <h5 className="fw-semibold">Free Shipping</h5>
            <p>Order above ₹249</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-16">
          <span className="material-icons feature-icon">lock</span>
          <div className="d-flex flex-column gap-8">
            <h5 className="fw-semibold">Secure Payment</h5>
            <p>100% secure</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-16">
          <span className="material-icons feature-icon">refresh</span>
          <div className="d-flex flex-column gap-8">
            <h5 className="fw-semibold">Easy Return</h5>
            <p>10 days easy return</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-16">
          <span className="material-icons feature-icon">support_agent</span>
          <div className="d-flex flex-column gap-8">
            <h5 className="fw-semibold">24/7 Support</h5>
            <p>Call us at any time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
