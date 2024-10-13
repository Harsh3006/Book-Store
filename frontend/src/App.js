import './App.css';
import './bootstrap.min.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, hideAlert } from './actions/alertAction';

import PrivateRoutes from './PrivateRoutes';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import FilterBook from './components/FilterBook';
import BookPage from './components/BookPage';
import MyAccount from './components/MyAccount';
import Cart from './components/Cart';
import OrderDetailPage from './components/OrderDetailPage';
import PlaceOrder from './components/PlaceOrder';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { message, status } = useSelector(state => state.alert);

  // Clearing error for previous page
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch, navigate])
  return (
    <>
      <div id="id_alert_wrapper" className={alert ? 'show' : ''}>
        {message && (
          <div className={`alert-message ${status}`}>
            <div className='d-flex flex-column gap-8'>
              <p className='fw-bold alert-title'>{status}</p>
              <span className="fw-medium">{message}</span>
            </div>
            <button className='btn-base btn-tertiary' onClick={() => dispatch(hideAlert())}>
              Close
              <span className="material-icons">close</span>
            </button>
          </div>
        )}
      </div>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <FilterBook />
          </>
        } />
        <Route path='/book/:id' element={<BookPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/my_account' element={<MyAccount />} />
          <Route path='/my_orders/:id' element={<OrderDetailPage />} />
          <Route path='/place_order' element={<PlaceOrder />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
