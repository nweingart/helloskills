import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from './AuthBackground';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/home');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Box sx={{ 
      minHeight: '100dvh',
      backgroundColor: '#1A1A1A',
      position: 'relative'
    }}>
      <AuthBackground />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: '1rem', sm: '1.5rem' },
          maxWidth: '600px',
          margin: '0 auto',
          gap: '4vh'
        }}
      >
        {/* Logo Section */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: '25vh'
        }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Bumbbled, cursive',
              color: '#E5A913',
              fontSize: 'clamp(3.5rem, 12vw, 4.5rem)',
              textAlign: 'center'
            }}
          >
            helloskills
          </Typography>
        </Box>

        {/* Form Section */}
        <Box sx={{ 
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '75%',
          maxWidth: '300px',
          margin: '0 auto',
          gap: '3vh'
        }}>
          <Box sx={{ textAlign: 'center', mb: '2vh' }}>
            <Typography 
              variant="body1" 
              color="grey.400"
              sx={{ 
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                lineHeight: 1.4,
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              Your influencers ready to help you
            </Typography>
            <Typography 
              variant="body1" 
              color="grey.400"
              sx={{ 
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                lineHeight: 1.4,
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              upgrade your skills
            </Typography>
          </Box>

          {error && (
            <Typography color="error" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2vh',
            width: '100%'
          }}>
            <TextField
              fullWidth
              placeholder="johndoe@gmail.com"
              InputProps={{
                startAdornment: (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: '100%', 
                    alignItems: 'flex-start' 
                  }}>
                    <Typography sx={{
                      fontSize: '0.65rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: '0.25em',
                      ml: '0.25em',
                    }}>
                      Email
                    </Typography>
                  </Box>
                ),
              }}
              sx={{
                backgroundColor: '#2A2A2A',
                borderRadius: '0.75rem',
                mb: 2,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: '0.5em',
                  minHeight: '4em',
                  '& input': {
                    ml: '0.25em',
                    mt: '-0.125em',
                    p: 0,
                    textAlign: 'left',
                    fontSize: '1.2rem',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.3)',
                      opacity: 1
                    }
                  },
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&:-webkit-autofill': {
                    '-webkit-box-shadow': '0 0 0 30px #404040 inset !important',
                    '-webkit-text-fill-color': 'white !important',
                    'caret-color': 'white'
                  }
                }
              }}
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              type="password"
              placeholder="password"
              InputProps={{
                startAdornment: (
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: '100%', 
                    alignItems: 'flex-start' 
                  }}>
                    <Typography sx={{
                      fontSize: '0.65rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: '0.25em',
                      ml: '0.25em',
                    }}>
                      Password
                    </Typography>
                  </Box>
                ),
              }}
              sx={{
                backgroundColor: '#2A2A2A',
                borderRadius: '0.75rem',
                mb: 2,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  py: '0.5em',
                  minHeight: '4em',
                  '& input': {
                    ml: '0.25em',
                    mt: '-0.125em',
                    p: 0,
                    textAlign: 'left',
                    fontSize: '1.2rem',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.3)',
                      opacity: 1
                    }
                  },
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                  '&:-webkit-autofill': {
                    '-webkit-box-shadow': '0 0 0 30px #404040 inset !important',
                    '-webkit-text-fill-color': 'white !important',
                    'caret-color': 'white'
                  }
                }
              }}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: '2vh',
          pb: '4vh'
        }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth={false}
            sx={{ 
              py: 1.5,
              px: 4,
              width: 'auto',
              margin: '0 auto',
              background: '#F7B614',
              borderRadius: '100px',
              display: 'block',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                background: '#E5A913',
                boxShadow: 'none'
              }
            }}
          >
            <Typography sx={{
              fontWeight: 600,
              fontSize: '1rem',
              color: '#000000',
              textTransform: 'none'
            }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Typography>
          </Button>
          
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: 'clamp(0.875rem, 2.92vw, 1.09rem)',
                color: 'white',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              I forgot my password.
            </Typography>

            <Typography 
              variant="body2" 
              color="grey.400" 
              textAlign="center"
              sx={{ 
                fontSize: 'clamp(1.125rem, 3.75vw, 1.4rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              <Link 
                component={RouterLink} 
                to="/signup"
                sx={{ 
                  color: '#F7B614',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontFamily: 'inherit',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Hey, I&apos;m new here →
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn; 