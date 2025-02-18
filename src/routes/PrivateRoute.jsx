import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  console.log('🔒 PrivateRoute: Rendering');
  console.log('🔒 PrivateRoute: Current user:', currentUser?.email);
  console.log('🔒 PrivateRoute: Loading state:', loading);

  if (loading) {
    console.log('🔒 PrivateRoute: Still loading, returning null');
    return null;
  }

  if (!currentUser) {
    console.log('🔒 PrivateRoute: No user, returning null');
    return null;
  }

  console.log('🔒 PrivateRoute: User authenticated, rendering children');
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute; 