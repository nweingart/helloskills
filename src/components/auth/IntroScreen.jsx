import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AuthBackground from './AuthBackground';
import SearchIcon from '@mui/icons-material/Search';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';

const IntroScreen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Get user initials
  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return '';
  };

  console.log('📱 IntroScreen: Rendering');
  console.log('📱 IntroScreen: Current user:', currentUser?.email);

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100dvh',
      display: 'flex'
    }}>
      <AuthBackground />
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 3 },
          background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start',
          width: '100%',
          margin: '1.5rem'
        }}>
          <Avatar 
            sx={{ 
              bgcolor: '#E5A913',
              width: '2.5rem',
              height: '2.5rem',
              fontSize: '0.9rem',
              marginRight: '1rem'
            }}
          >
            {getInitials()}
          </Avatar>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 0.5
          }}>
            <Typography sx={{ 
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: 1,
            }}>
              {userData?.firstName || 'Loading...'}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                py: 0.5,
                px: 1.5,
                borderRadius: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.5px'
              }}
            >
              FOLLOWER
            </Typography>
          </Box>
          
          {/* Added back the icons */}
          <Box sx={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            gap: '0.5rem',
            mr: '1rem'
          }}>
            <IconButton
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                width: '2.5rem',
                height: '2.5rem'
              }}
            >
              <MicIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                width: '2.5rem',
                height: '2.5rem'
              }}
            >
              <VideocamIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: '1.5rem',
          mt: '60%'  // Increased from 40% to 60% to push everything down further
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <Typography
              sx={{
                fontFamily: 'Gloria Hallelujah, cursive',
                color: '#F7B614',
                fontSize: { xs: '2rem', sm: '2.5rem' },
                textAlign: 'center',
                maxWidth: '90%'
              }}
            >
              Learn from your real-world Influencers
            </Typography>

            <Typography
              sx={{
                color: '#E5A913',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                textAlign: 'center',
                maxWidth: '80%'
              }}
            >
              Find your favorite influencers and learn directly from them through personalized video feedback. Get started by searching for your favorite influencer.
            </Typography>
          </Box>

          <Box
            onClick={() => navigate('/creators')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2rem',
              py: { xs: 1.5, sm: 2 },
              px: { xs: 2.5, sm: 3 },
              width: 'fit-content',
              maxWidth: '90%',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            <SearchIcon sx={{ color: 'white', mr: 1 }} />
            <Typography sx={{ 
              color: 'white',
              whiteSpace: 'nowrap',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.5px'
            }}>
              Skills Gurus
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default IntroScreen; 