import { motion } from 'framer-motion';
import { Box, Typography, Avatar, IconButton, Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ 
        height: '100vh',
        overflow: 'hidden', // Changed to hidden to prevent double scrollbars
      }}
    >
      <Box sx={{ 
        height: '100%',
        overflow: 'auto', // Add scroll here
        bgcolor: '#404040',
        color: 'white',
        background: `
          radial-gradient(circle at 50% 50%, rgba(40,40,40,0.7) 0%, rgba(0,0,0,0.95) 100%),
          radial-gradient(circle at 50% -20%, rgba(255,190,90,0.2) 0%, transparent 60%)
        `,
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        position: 'relative',
      }}>
        <Box sx={{ 
          p: 3,
          pb: 6,
          maxWidth: '600px',
          margin: '0 auto',
          minHeight: '150vh', // Force content to be taller than viewport
        }}>
          {/* Top Section */}
          <IconButton 
            onClick={() => navigate(-1)}
            sx={{ 
              color: 'white', 
              mb: 2,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Profile Info */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 60, 
                height: 60,
                border: '2px solid rgba(247, 182, 20, 0.5)' // Gold border
              }}
            />
            <Box>
              <Typography 
                variant="h6"
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                {userData?.firstName || 'Loading...'}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  '&:hover': { color: '#F7B614' },
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                See your profile
              </Typography>
            </Box>
          </Stack>

          {/* Create Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'rgba(247, 182, 20, 0.15)', // Gold theme
              color: '#F7B614',
              py: 1.5,
              mb: 4,
              '&:hover': {
                bgcolor: 'rgba(247, 182, 20, 0.25)'
              },
              fontFamily: 'Inter, sans-serif'
            }}
          >
            + CREATE
          </Button>

          {/* Menu Items */}
          <Stack spacing={3}>
            {/* Interests Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                cursor: 'pointer',
                p: 2,
                borderRadius: 1,
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.05)'
                },
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Box sx={{ width: 24, height: 24 }}>✨</Box>
              <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>
                Interests
              </Typography>
            </Box>

            {/* Influencers Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                cursor: 'pointer',
                p: 2,
                borderRadius: 1,
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.05)'
                },
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Box sx={{ width: 24, height: 24 }}>👥</Box>
              <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>
                Influencers
              </Typography>
            </Box>

            {/* Feedback Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                cursor: 'pointer',
                p: 2,
                borderRadius: 1,
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.05)'
                },
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Box sx={{ width: 24, height: 24 }}>💭</Box>
              <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>
                Feedback
              </Typography>
            </Box>

            {/* Log Out */}
            <Box 
              onClick={() => {
                auth.signOut();
                navigate('/signin');
              }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                cursor: 'pointer',
                p: 2,
                borderRadius: 1,
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.05)'
                },
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Box sx={{ width: 24, height: 24 }}>↪️</Box>
              <Typography sx={{ fontFamily: 'Inter, sans-serif' }}>
                Log Out
              </Typography>
            </Box>
          </Stack>

          {/* FAQ Section */}
          <Box sx={{ 
            mt: 6, 
            pt: 3, 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontFamily: 'Inter, sans-serif'
          }}>
            <Typography 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              Questions?
            </Typography>
            <Typography 
              component="span" 
              sx={{ 
                color: '#F7B614',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
            >
              FAQ↗
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Profile; 