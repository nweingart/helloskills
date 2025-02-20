import { Box, Typography, InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import CreatorRow from '../creators/CreatorRow';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

const CreatorsScreen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [gurus, setGurus] = useState([]);
  const [followedGurus, setFollowedGurus] = useState(new Set());
  const [notification, setNotification] = useState('');
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [filteredCreators, setFilteredCreators] = useState([]);

  // Fetch gurus from Firestore
  useEffect(() => {
    const fetchGurus = async () => {
      try {
        const gurusRef = collection(db, 'Gurus');
        const q = query(gurusRef, orderBy('name'));
        const snapshot = await getDocs(q);
        const gurusList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGurus(gurusList);
      } catch (error) {
        console.error('Error fetching Gurus:', error);
      }
    };

    fetchGurus();
  }, []);

  // Fetch user's followed gurus
  useEffect(() => {
    const fetchFollowedGurus = async () => {
      if (currentUser) {
        console.log('🔍 Fetching followed gurus for user:', currentUser.uid);
        const followingRef = collection(db, 'userFollowing', currentUser.uid, 'gurus');
        const snapshot = await getDocs(followingRef);
        const followedIds = new Set(snapshot.docs.map(doc => doc.id));
        console.log('📥 Fetched followed gurus:', Array.from(followedIds));
        setFollowedGurus(followedIds);
      }
    };

    fetchFollowedGurus();
  }, [currentUser]);

  useEffect(() => {
    // Sort creators by rating (highest to lowest) and then filter
    const sortedCreators = [...gurus].sort((a, b) => b.rating - a.rating);
    
    if (searchQuery) {
      const filtered = sortedCreators.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.categories.some(category => 
          category.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        creator.socials.some(social =>
          social.handle.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCreators(filtered);
    } else {
      setFilteredCreators(sortedCreators);
    }
  }, [gurus, searchQuery]);

  const handleFollow = async (creator) => {
    console.log('handleFollow called with:', creator);
    if (!currentUser) return;

    try {
      const creatorRef = doc(db, 'userFollowing', currentUser.uid, 'Gurus', creator.id);
      
      if (followedGurus.has(creator.id)) {
        console.log('Unfollowing creator');
        await deleteDoc(creatorRef);
        setFollowedGurus(prev => {
          const newSet = new Set(prev);
          newSet.delete(creator.id);
          const followCount = newSet.size;
          
          // Update notification based on new count
          if (followCount < 3) {
            setNotification(`Follow ${3 - followCount} more gurus to continue`);
            setShowContinueButton(false);
            setTimeout(() => setNotification(''), 2000);
          }
          
          return newSet;
        });
      } else {
        console.log('Following creator');
        await setDoc(creatorRef, {
          name: creator.name,
          avatar: creator.avatar,
          rating: creator.rating,
          socials: creator.socials,
          categories: creator.categories,
          addedAt: new Date().toISOString()
        });
        
        setFollowedGurus(prev => {
          const newSet = new Set(prev);
          newSet.add(creator.id);
          const followCount = newSet.size;
          
          // Show notifications based on follow count
          if (followCount === 1 || followCount === 2) {
            setNotification(`Follow ${3 - followCount} more gurus to continue`);
            setTimeout(() => setNotification(''), 2000);
          } else if (followCount === 3) {
            setNotification('Great! You can now continue');
            setShowContinueButton(true);
            setTimeout(() => setNotification(''), 2000);
          }
          
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error in handleFollow:', error);
      setNotification('Error updating follow status. Please try again.');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  // Add a useEffect to monitor notification state
  useEffect(() => {
    console.log('🔔 Notification state changed:', notification);
  }, [notification]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Continue Button - OUTSIDE and ABOVE the main container */}
      {showContinueButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            bottom: '20%', // Bring it up higher in the viewport
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <Box
            onClick={() => navigate('/interests')}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: '2rem',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.9)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <Typography>
              Continue
            </Typography>
          </Box>
        </motion.div>
      )}

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{
          minHeight: '100dvh',
          background: `
            linear-gradient(
              180deg,
              rgba(255, 240, 230, 0.1) 0%,
              rgba(70, 65, 75, 0.2) 100%
            ),
            linear-gradient(
              45deg,
              rgba(255, 200, 150, 0.08) 0%,
              rgba(60, 50, 60, 0.15) 100%
            ),
            radial-gradient(
              circle at top right,
              rgba(255, 190, 140, 0.1) 0%,
              transparent 60%
            )
          `,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: '1rem', sm: '1.5rem' },
        }}
      >
        {/* Search Bar - without the container */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '0.5rem', sm: '0.75rem' },
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            p: { xs: '0.75rem 1rem', sm: '0.875rem 1.25rem' },
            position: 'sticky',
            top: { xs: '1rem', sm: '1.5rem' },
            zIndex: 10,
          }}
        >
          <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.6)' }} />
          <InputBase
            placeholder="Name, Insta or TikTok handle"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              flex: 1,
              color: 'white',
              fontSize: { xs: '16px', sm: '1rem' },
              '& input': {
                fontSize: 'inherit',
              },
              '& input::placeholder': {
                color: 'rgba(255, 255, 255, 0.6)',
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Scrollable content container */}
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '1.5rem', sm: '2rem' },
          mt: { xs: '1.5rem', sm: '2rem' },
        }}>
          {/* Content wrapper */}
          <Box sx={{ 
            flex: 1,
            p: { xs: '1rem', sm: '1.5rem' },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '1rem', sm: '1.5rem' }
          }}>
            {/* Title */}
            <Typography
              sx={{
                fontFamily: '"Gloria Hallelujah", cursive',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
                color: '#F7B614',
                textAlign: 'center'
              }}
            >
              Find Skill Gurus
            </Typography>

            {/* Results */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '0.75rem', sm: '1rem' }
            }}>
              {filteredCreators.map((guru) => (
                <CreatorRow
                  key={guru.id || guru.name.toLowerCase().replace(/\s+/g, '-')}
                  creator={guru}
                  onFollow={() => handleFollow(guru)}
                  isFollowing={followedGurus.has(guru.id)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Notification */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: notification ? 1 : 0, y: notification ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          top: '2rem',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        {notification && (
          <Box
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: '2rem',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)'
            }}
          >
            <Typography>{notification}</Typography>
          </Box>
        )}
      </motion.div>
    </>
  );
};

export default CreatorsScreen; 