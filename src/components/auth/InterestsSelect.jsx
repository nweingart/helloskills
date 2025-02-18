import { Box, Typography, InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

const TOPICS = [
  "Photography", "Videography", "Motion Design", "UI Design",
  "Graphic Design", "3D Animation", "Music Production", "Sound Design",
  "Voice Acting", "Dance", "Singing", "Cooking", "Baking",
  "Mixology", "Fashion", "Makeup", "Hair Styling", "Writing",
  "Storytelling", "Poetry"
];

const InterestsSelect = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [notification, setNotification] = useState(null);

  const filteredTopics = useMemo(() => {
    if (!searchValue.trim()) return TOPICS;
    const query = searchValue.toLowerCase().trim();
    return TOPICS.filter(topic => 
      topic.toLowerCase().includes(query)
    );
  }, [searchValue]);

  const handleInterestClick = (interest) => {
    if (selectedTopics.has(interest)) {
      const newSelected = new Set(selectedTopics);
      newSelected.delete(interest);
      setSelectedTopics(newSelected);
    } else if (selectedTopics.size < 3) {
      const newSelected = new Set(selectedTopics);
      newSelected.add(interest);
      setSelectedTopics(newSelected);
      if (newSelected.size === 3) {
        setNotification('Tap continue to find your skill gurus');
      } else {
        setNotification(`Select ${3 - newSelected.size} more skills to continue`);
      }
    } else {
      setNotification('Maximum 3 skills allowed');
    }

    // Clear notification after 2 seconds
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleButtonClick = async () => {
    if (selectedTopics.size === 3) {
      try {
        const interestsRef = collection(db, 'userInterests', currentUser.uid, 'topics');
        const batch = writeBatch(db);
        
        selectedTopics.forEach((topic) => {
          const topicDoc = doc(interestsRef, topic.toLowerCase().replace(/\s+/g, '-'));
          batch.set(topicDoc, {
            name: topic,
            addedAt: new Date().toISOString()
          });
        });

        // Update user's onboarding status
        const userRef = doc(db, 'users', currentUser.uid);
        batch.update(userRef, {
          onboardingComplete: true
        });

        await batch.commit();
        navigate('/home');
      } catch (error) {
        console.error('Error updating interests:', error);
      }
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        minHeight: '-webkit-fill-available',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `
          radial-gradient(
            circle at center,
            rgba(64, 64, 64, 1) 0%,
            rgba(0, 0, 0, 1) 100%
          )
        `,
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      {/* Content area */}
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: '1rem', sm: '1.5rem' }
      }}>
        {/* Title and Interests Container */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '2rem', sm: '2.5rem' }
        }}>
          {/* Title */}
          <Typography
            sx={{
              fontFamily: '"Gloria Hallelujah", cursive',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              color: '#F7B614',
              textAlign: 'center',
              mt: { xs: '1rem', sm: '1.5rem' }
            }}
          >
            What skill set are you looking for?
          </Typography>

          {/* Interests List */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: '1.25rem', sm: '1.5rem' },
            width: '100%',
            maxWidth: { xs: '280px', sm: '320px' },
            mx: 'auto'
          }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '3.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                mb: 4
              }}
            >
              <Typography 
                sx={{ 
                  color: searchValue ? '#F7B614' : 'rgba(255, 255, 255, 0.4)',
                  fontSize: '3rem',
                  lineHeight: 1,
                  userSelect: 'none'
                }}
              >
                #
              </Typography>
              <InputBase
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                sx={{
                  width: '200px',
                  fontSize: '2rem',
                  transition: 'color 0.3s ease',
                  '& input': {
                    color: searchValue ? '#F7B614' : 'rgba(255, 255, 255, 0.4)',
                    textAlign: 'left',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)',
                      opacity: 1,
                      transition: 'opacity 0.2s'
                    }
                  }
                }}
              />
            </Box>

            {filteredTopics.map((topic) => (
              <Box
                key={topic}
                onClick={() => handleInterestClick(topic)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  transform: selectedTopics.has(topic) ? 'scale(1.1)' : 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Typography sx={{
                  color: selectedTopics.has(topic) ? '#F7B614' : 'white',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  fontWeight: selectedTopics.has(topic) ? 600 : 400,
                  textAlign: 'center'
                }}>
                  #{topic}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ 
            flex: 1
          }} />
        </Box>

        {/* Continue Button */}
        {selectedTopics.size === 3 && (
          <Box
            onClick={handleButtonClick}
            sx={{
              position: 'fixed',
              bottom: { xs: '2rem', sm: '3rem' },
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#F7B614',
              color: 'black',
              py: { xs: '0.75rem', sm: '1rem' },
              px: { xs: '2rem', sm: '2.5rem' },
              borderRadius: '2rem',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              zIndex: 10,
              '&:hover': {
                bgcolor: '#e5a913'
              }
            }}
          >
            Continue
          </Box>
        )}
      </Box>

      {/* Notification */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: notification ? 1 : 0,
          y: notification ? 0 : -20 
        }}
        transition={{ duration: 0.2 }}
      >
        {notification && (
          <Box sx={{
            position: 'fixed',
            top: { xs: '1rem', sm: '1.5rem' },
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            py: { xs: '0.75rem', sm: '1rem' },
            px: { xs: '1.5rem', sm: '2rem' },
            borderRadius: '2rem',
            backdropFilter: 'blur(0.5rem)',
            WebkitBackdropFilter: 'blur(0.5rem)',
            zIndex: 11,
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}>
            {notification}
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

export default InterestsSelect; 