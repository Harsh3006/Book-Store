import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  fetchCategories,
  fetchGenres,
} from "../actions/bookAction";

function Filters() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [bookFilters, setBookFilters] = useState({
    categories: [],
    genres: [],
    publication_date: "",
    customer_rating: "",
    price_range_min: "",
    price_range_max: "",
    include_out_of_stock: false,
  });
  const { categories } = useSelector((state) => state.category);
  const { genres } = useSelector((state) => state.genre);

  // Fetching categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // Fetching genres
  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  // Update the bookFilters state with new values
  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "categories" || name === "genres") {
      setBookFilters((prevFilters) => {
        let updatedValues;
        if (checked) {
          // Add the value to the array if it's checked
          updatedValues = [...prevFilters[name], value];
        } else {
          // Remove the value from the array if it's unchecked
          updatedValues = prevFilters[name].filter((item) => item !== value);
        }
        return {
          ...prevFilters,
          [name]: updatedValues,
        };
      });
    } else if (name === "include_out_of_stock") {
      setBookFilters((prevFilters) => {
        let updatedValue;
        if (checked) {
          updatedValue = true;
        } else {
          updatedValue = false;
        }
        return {
          ...prevFilters,
          [name]: updatedValue,
        };
      });
    } else {
      setBookFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };
  const handleApplyFilters = () => {
    const apply_filter_btn = document.getElementById("id_apply_filter_btn");
    apply_filter_btn.classList.add("loading");
    dispatch(fetchBooks(bookFilters)).then(() => {
      apply_filter_btn.classList.remove("loading");
    });
  };
  const handleClearFilters = () => {
    const clear_filters_btn = document.getElementById(
      "id_clear_all_filters_btn"
    );
    clear_filters_btn.classList.add("loading");
    // Clear all filters input
    setBookFilters({
      categories: [],
      genres: [],
      publication_date: "",
      customer_rating: "",
      price_range_min: "",
      price_range_max: "",
      include_out_of_stock: false,
    });
    dispatch(fetchBooks()).then(() => {
      clear_filters_btn.classList.remove("loading");
    });
  };
  const handleSearchResult = (event) => {
    event.preventDefault();
    dispatch(fetchBooks({ search: searchText }));
  };
  const toggleFiltersContainer = () => {
    const filters_container = document.getElementById("id_filters_container");
    filters_container.classList.toggle("show");
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between gap-24 w-100">
        <button
          className="btn-base btn-primary"
          onClick={toggleFiltersContainer}
        >
          <span className="material-icons-outlined">tune</span>
          <p>Filters</p>
        </button>
        <form
          className="book-search-form d-flex align-items-center gap-8"
          onSubmit={handleSearchResult}
        >
          <input
            id="search"
            type="text"
            name="search-box"
            placeholder="Search here..."
            minLength="3"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button className="feature-icon">
            <span className="material-icons-outlined">search</span>
          </button>
        </form>
      </div>
      <div id="id_filters_container" className="w-100">
        <div className="filters-container">
          <div className="filters">
            <div className="filter">
              <p className="fw-semibold">Category</p>
              <div className="options">
                {categories.map((category, index) => (
                  <label
                    key={`$category_${index}`}
                    htmlFor={`id_category_${index}`}
                    className="checkbox-label"
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      id={`id_category_${index}`}
                      value={category}
                      checked={bookFilters.categories.includes(`${category}`)}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="checkmark"></span>
                    <p className="fw-medium">{category}</p>
                  </label>
                ))}
              </div>
            </div>
            <div className="filter">
              <p className="fw-semibold">Genres</p>
              <div className="options">
                {genres.map((genre, index) => (
                  <label
                    key={`$genre${index}`}
                    htmlFor={`id_genre_${index}`}
                    className="checkbox-label"
                  >
                    <input
                      type="checkbox"
                      name="genres"
                      id={`id_genre_${index}`}
                      value={genre}
                      checked={bookFilters.genres.includes(`${genre}`)}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="checkmark"></span>
                    <p className="fw-medium">{genre}</p>
                  </label>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter">
                <p className="fw-semibold">Publication Date</p>
                <div className="options">
                  <label htmlFor="id_publish_last_week" className="radio-label">
                    <input
                      type="radio"
                      name="publication_date"
                      id="id_publish_last_week"
                      value="last_week"
                      checked={bookFilters.publication_date === "last_week"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="fw-medium">Last Week</p>
                  </label>
                  <label
                    htmlFor="id_publish_last_month"
                    className="radio-label"
                  >
                    <input
                      type="radio"
                      name="publication_date"
                      id="id_publish_last_month"
                      value="last_month"
                      checked={bookFilters.publication_date === "last_month"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="fw-medium">Last Month</p>
                  </label>
                  <label htmlFor="id_publish_last_year" className="radio-label">
                    <input
                      type="radio"
                      name="publication_date"
                      id="id_publish_last_year"
                      value="last_year"
                      checked={bookFilters.publication_date === "last_year"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="fw-medium">Last Year</p>
                  </label>
                </div>
              </div>
              <div className="filter">
                <p className="fw-semibold">Customer Rating</p>
                <div className="flex-md-column flex-row flex-wrap options">
                  <label htmlFor="id_5_star" className="radio-label">
                    <input
                      type="radio"
                      name="customer_rating"
                      id="id_5_star"
                      value="5"
                      checked={bookFilters.customer_rating === "5"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="d-flex align-items-center gap-2 fw-medium">
                      5
                      <span className="material-icons-outlined">
                        star_outline
                      </span>
                    </p>
                  </label>
                  <label htmlFor="id_4_star" className="radio-label">
                    <input
                      type="radio"
                      name="customer_rating"
                      id="id_4_star"
                      value="4"
                      checked={bookFilters.customer_rating === "4"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="align-items-center d-flex fw-medium">
                      4
                      <span className="material-icons-outlined">
                        star_outline
                      </span>
                      & above
                    </p>
                  </label>
                  <label htmlFor="id_3_star" className="radio-label">
                    <input
                      type="radio"
                      name="customer_rating"
                      id="id_3_star"
                      value="3"
                      checked={bookFilters.customer_rating === "3"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="align-items-center d-flex fw-medium">
                      3
                      <span className="material-icons-outlined">
                        star_outline
                      </span>
                      & above
                    </p>
                  </label>
                  <label htmlFor="id_2_star" className="radio-label">
                    <input
                      type="radio"
                      name="customer_rating"
                      id="id_2_star"
                      value="2"
                      checked={bookFilters.customer_rating === "2"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="align-items-center d-flex fw-medium">
                      2
                      <span className="material-icons-outlined">
                        star_outline
                      </span>
                      & above
                    </p>
                  </label>
                  <label htmlFor="id_1_star" className="radio-label">
                    <input
                      type="radio"
                      name="customer_rating"
                      id="id_1_star"
                      value="1"
                      checked={bookFilters.customer_rating === "1"}
                      onChange={handleFilterChange}
                      hidden
                    />
                    <span className="radiomark"></span>
                    <p className="align-items-center d-flex fw-medium">
                      1
                      <span className="material-icons-outlined">
                        star_outline
                      </span>
                      & above
                    </p>
                  </label>
                </div>
              </div>
            </div>
            <div className="filter-group">
              <div className="filter">
                <div className="d-flex flex-column gap-4">
                  <p className="fw-semibold">Price Range</p>
                  <p>Enter min and max price</p>
                </div>
                <div className="price-input">
                  <div className="field">
                    <p className="fw-medium">Min</p>
                    <input
                      type="number"
                      className="input-min"
                      min="0"
                      name="price_range_min"
                      value={bookFilters.price_range_min}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <span className="material-icons">remove</span>
                  <div className="field">
                    <p className="fw-medium">Max</p>
                    <input
                      type="text"
                      className="input-max"
                      name="price_range_max"
                      value={bookFilters.price_range_max}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
              <div className="filter">
                <p className="fw-semibold">Stock Availability</p>
                <label htmlFor="id_out_of_stock" className="checkbox-label">
                  <input
                    type="checkbox"
                    name="include_out_of_stock"
                    id="id_out_of_stock"
                    checked={bookFilters.include_out_of_stock}
                    onChange={handleFilterChange}
                    hidden
                  />
                  <span className="checkmark"></span>
                  <p className="align-items-center d-flex fw-medium">
                    Include out of stock
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex gap-20 ml-auto">
            <button
              id="id_apply_filter_btn"
              className="btn-base btn-primary"
              onClick={handleApplyFilters}
            >
              Apply
            </button>
            <button
              id="id_clear_all_filters_btn"
              className="btn-base btn-primary"
              onClick={handleClearFilters}
            >
              Clear all filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
