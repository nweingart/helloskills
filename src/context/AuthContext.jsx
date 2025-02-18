import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({
  currentUser: null,
  loading: true
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('🔥 AuthProvider: Initializing');
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔥 AuthProvider: Auth state changed');
      console.log('🔥 AuthProvider: User data:', user ? user.email : 'No user');
      
      setCurrentUser(user);
      setLoading(false);
      
      // Define public routes
      const publicRoutes = ['/', '/signin', '/signup', '/interests'];
      const currentPath = location.pathname;
      
      if (!user && !publicRoutes.includes(currentPath)) {
        console.log('🔥 AuthProvider: No user, on protected route, redirecting to signin');
        navigate('/signin');
      } else {
        console.log('🔥 AuthProvider: User or public route, no redirect needed');
      }
    });

    return () => {
      console.log('🔥 AuthProvider: Cleaning up auth listener');
      unsubscribe();
    };
  }, [navigate, location]);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext; 