import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showWarning } from './actions/alertAction';
import { useEffect } from 'react';

const PrivateRoutes = () => {
    const { access_token } = useSelector(state => state.user);
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!access_token) {
            dispatch(showWarning("Please login first!"))
        }
    }, [])
    return (
        access_token ? <Outlet /> : <Navigate to={`/login?next=${location.pathname}`} />
    )
}

export default PrivateRoutes;