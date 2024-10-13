function Rating({ customer_rating }) {
  return (
    <div className="d-flex align-items-center gap-4 text-theme">
      <span className="material-icons">
        {customer_rating >= 1
          ? "star"
          : customer_rating >= 0.5
          ? "star_half"
          : "star_outline"}
      </span>
      <span className="material-icons">
        {customer_rating >= 2
          ? "star"
          : customer_rating >= 1.5
          ? "star_half"
          : "star_outline"}
      </span>
      <span className="material-icons">
        {customer_rating >= 3
          ? "star"
          : customer_rating >= 2.5
          ? "star_half"
          : "star_outline"}
      </span>
      <span className="material-icons">
        {customer_rating >= 4
          ? "star"
          : customer_rating >= 3.5
          ? "star_half"
          : "star_outline"}
      </span>
      <span className="material-icons">
        {customer_rating >= 5
          ? "star"
          : customer_rating >= 4.5
          ? "star_half"
          : "star_outline"}
      </span>
      <span className="fw-medium">{customer_rating}</span>
    </div>
  );
}

export default Rating;
