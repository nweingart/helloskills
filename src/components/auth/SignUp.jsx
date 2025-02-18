import { Box, Typography, TextField, Button, IconButton, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import AuthBackground from './AuthBackground';
import { motion } from 'framer-motion';

const SignUp = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isFormValid = () => {
    return (
      accountType !== '' &&
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Wait for the user to be fully created
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: new Date().toISOString(),
        accountType: 'follower',
        interests: []
      });

      // Verify user is properly authenticated before navigating
      if (auth.currentUser) {
        navigate('/intro');
      } else {
        throw new Error('User creation successful but authentication failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      
      // Handle specific Firebase auth errors
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please sign in instead.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters long.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        default:
          setError('An error occurred during sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
          margin: '0 auto'
        }}
      >
        {/* Back Button */}
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{ 
            position: 'absolute',
            left: 25,
            top: 25,
            color: 'white',
            backgroundColor: 'rgba(248, 242, 242, 0.45)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
            padding: '6px',
            '& .MuiSvgIcon-root': {
              fontSize: '1.35rem'
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Main Content */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '75%',
          maxWidth: '300px',
          margin: '0 auto',
          gap: '2vh',
          pt: '80px'
        }}>
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              textAlign: 'center',
              fontSize: '0.85rem',
              letterSpacing: '0.20em',
              textTransform: 'uppercase',
              fontWeight: '600',
              mb: 1
            }}
          >
            Pick an account type
          </Typography>

          <RadioGroup
            aria-label="account-type"
            name="account-type"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            sx={{ 
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1
            }}>
              <FormControlLabel
                value="influencer"
                control={
                  <Radio 
                    sx={{ 
                      padding: 0,
                      marginRight: 1,
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-checked': {
                        color: '#F7B614'
                      }
                    }} 
                  />
                }
                label={
                  <Box sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    gap: 1
                  }}>
                    I am an Influencer
                    {accountType === 'influencer' && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15
                        }}
                      >
                        ✨
                      </motion.span>
                    )}
                  </Box>
                }
                sx={{
                  margin: 0,
                  '& .MuiFormControlLabel-label': {
                    color: accountType === 'influencer' ? '#F7B614' : 'white',
                    transition: 'color 0.3s ease-in-out',
                    fontStyle: 'italic',
                    fontSize: '1.4rem'
                  }
                }}
              />
              <Typography sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.75rem',
                lineHeight: 1.3,
                pl: '2.5rem'
              }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  I got the skills!
                </Box>
                {' '}Share your skills with your followers across platforms and charge for your feedback/comments.
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1
            }}>
              <FormControlLabel
                value="follower"
                control={
                  <Radio 
                    sx={{ 
                      padding: 0,
                      marginRight: 1,
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-checked': {
                        color: '#F7B614'
                      }
                    }} 
                  />
                }
                label={
                  <Box sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center',
                    gap: 1
                  }}>
                    I am a Follower
                    {accountType === 'follower' && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 15
                        }}
                      >
                        ✨
                      </motion.span>
                    )}
                  </Box>
                }
                sx={{
                  margin: 0,
                  '& .MuiFormControlLabel-label': {
                    color: accountType === 'follower' ? '#F7B614' : 'white',
                    transition: 'color 0.3s ease-in-out',
                    fontStyle: 'italic',
                    fontSize: '1.4rem'
                  }
                }}
              />
              <Typography sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '0.75rem',
                lineHeight: 1.3,
                pl: '2.5rem'
              }}>
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  I need the skills!
                </Box>
                {' '}Send your unique 10-30 second video clip to the influencer you follow for video comment based on the skills and instruction they share broadly with their audience.
              </Typography>
            </Box>
          </RadioGroup>

          {/* Text Input Fields */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 0.75
          }}>
            <TextField
              fullWidth
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
                      First Name
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
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            
            <TextField
              fullWidth
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
                      Last Name
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
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            
            <TextField
              fullWidth
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
              value={formData.email}
              onChange={handleInputChange}
            />
            
            <TextField
              fullWidth
              type="password"
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
              value={formData.password}
              onChange={handleInputChange}
            />
          </Box>

          <Typography sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '0.675rem',
            textAlign: 'center', 
            mb: 2,
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            By continuing, you agree to HelloSkills&apos;
            <Typography 
              component="span" 
              sx={{ 
                color: 'white', 
                textDecoration: 'underline', 
                mx: 0.5,
                fontSize: 'inherit'
              }}
            >
              Terms of Service
            </Typography>
            and acknowledge that you&apos;ve read our
            <Typography 
              component="span" 
              sx={{ 
                color: 'white', 
                textDecoration: 'underline', 
                mx: 0.5,
                fontSize: 'inherit'
              }}
            >
              Privacy Policy
            </Typography>
            .
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth={false}
              disabled={!isFormValid() || loading}
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
                },
                '&.Mui-disabled': {
                  background: '#808080 !important',
                }
              }}
            >
              <Typography sx={{
                fontWeight: 600,
                fontSize: '1rem',
                color: '#000000',
                textTransform: 'none'
              }}>
                {loading ? 'Joining...' : 'Join Now'}
              </Typography>
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp; 