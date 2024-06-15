import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children}) {
  let { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return  <>{children}</>;
}
PrivateRoute.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default PrivateRoute;