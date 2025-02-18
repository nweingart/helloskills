import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth } from './config/firebase';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import IntroScreen from './components/auth/IntroScreen';
import CreatorsScreen from './components/auth/CreatorsScreen';
import InterestsSelect from './components/auth/InterestsSelect';
import Home from './pages/Home';
import PrivateRoute from './routes/PrivateRoute';
import { AnimatePresence } from 'framer-motion';
import Profile from './pages/Profile';
import Find from './pages/Find';
import InfluencerUpload from './components/admin/InfluencerUpload';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1A1A1A',
          margin: 0,
          padding: 0,
          minHeight: '100dvh',
        }
      }
    }
  }
});

function App() {
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/signin" replace />} />
              <Route path="/intro" element={<IntroScreen />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/creators" element={<CreatorsScreen />} />
              <Route path="/interests" element={<InterestsSelect />} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/find" element={<PrivateRoute><Find /></PrivateRoute>} />
              <Route path="/admin/upload" element={<PrivateRoute><InfluencerUpload /></PrivateRoute>} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
