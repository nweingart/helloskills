import { Box, Typography, InputBase } from '@mui/material';
import { motion } from 'framer-motion';
import CreatorRow from '../creators/CreatorRow';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

const CreatorsScreen = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [creators, setCreators] = useState([]);
  const [followedCreators, setFollowedCreators] = useState(new Set());
  const [notification, setNotification] = useState('');
  const [showContinueButton, setShowContinueButton] = useState(false);

  // Fetch creators from Firestore
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const creatorsRef = collection(db, 'creators');
        const q = query(creatorsRef, orderBy('name')); // Order by name for consistent listing
        const snapshot = await getDocs(q);
        const creatorsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCreators(creatorsList);
      } catch (error) {
        console.error('Error fetching creators:', error);
      }
    };

    fetchCreators();
  }, []);

  // Fetch user's followed creators
  useEffect(() => {
    const fetchFollowedCreators = async () => {
      if (currentUser) {
        console.log('🔍 Fetching followed creators for user:', currentUser.uid);
        const followingRef = collection(db, 'userFollowing', currentUser.uid, 'creators');
        const snapshot = await getDocs(followingRef);
        const followedIds = new Set(snapshot.docs.map(doc => doc.id));
        console.log('📥 Fetched followed creators:', Array.from(followedIds));
        setFollowedCreators(followedIds);
      }
    };

    fetchFollowedCreators();
  }, [currentUser]);

  const filteredCreators = useMemo(() => {
    if (!searchQuery.trim()) return creators;

    const query = searchQuery.toLowerCase().trim();
    return creators.filter(creator => {
      if (creator.name.toLowerCase().includes(query)) return true;
      if (creator.categories.some(cat => cat.toLowerCase().includes(query))) return true;
      return creator.socials.some(social => 
        social.handle.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, creators]);

  const handleFollow = async (creator) => {
    console.log('🚀 handleFollow called with creator:', creator);
    if (!currentUser) return;

    try {
      const creatorRef = doc(db, 'userFollowing', currentUser.uid, 'creators', creator.id);
      
      if (followedCreators.has(creator.id)) {
        await deleteDoc(creatorRef);
        setFollowedCreators(followedCreators => {
          const newSet = new Set(followedCreators);
          newSet.delete(creator.id);
          return newSet;
        });
      } else {
        // Only save fields that exist in the creator object
        const creatorData = {
          name: creator.name,
          avatar: creator.avatar,
          rating: creator.rating,
          socials: creator.socials,
          createdAt: creator.createdAt,
          featured: creator.featured
        };
        
        await setDoc(creatorRef, creatorData);
        setFollowedCreators(followedCreators => {
          const newSet = new Set(followedCreators);
          newSet.add(creator.id);
          
          const followCount = newSet.size;
          if (followCount === 1 || followCount === 2) {
            setNotification(`Follow ${3 - followCount} more creator${followCount === 2 ? '' : 's'} to continue`);
            setTimeout(() => setNotification(''), 2000);
          } else if (followCount === 3) {
            setNotification('');
            setShowContinueButton(true);
          }
          
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  // Add a useEffect to monitor notification state
  useEffect(() => {
    console.log('🔔 Notification state changed:', notification);
  }, [notification]);

  const handleSearch = (value) => {
    setSearchQuery(value);
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
      {/* Search bar - now at the top */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(0.5rem)',
          WebkitBackdropFilter: 'blur(0.5rem)',
          p: { xs: '0.75rem', sm: '1rem' },
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '0.5rem', sm: '0.75rem' },
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            p: { xs: '0.75rem 1rem', sm: '0.875rem 1.25rem' }
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
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              px: { xs: '0.75rem', sm: '1rem' },
              py: { xs: '0.25rem', sm: '0.375rem' },
              borderRadius: '2rem',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            #Skill
          </Box>
        </Box>
      </Box>

      {/* Scrollable content container */}
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
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
            {filteredCreators.map((creator) => (
              <CreatorRow
                key={creator.id || creator.name.toLowerCase().replace(/\s+/g, '-')}
                creator={creator}
                onFollow={() => handleFollow(creator)}
                isFollowing={followedCreators.has(creator.id)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Notification - moved to top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: notification ? 1 : 0, y: notification ? 0 : -20 }}
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0.25rem 1rem rgba(0, 0, 0, 0.2)'
          }}>
            <Typography sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              textAlign: 'center'
            }}>
              {notification}
            </Typography>
          </Box>
        )}
      </motion.div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContinueButton ? 1 : 0, y: showContinueButton ? 0 : 20 }}
        transition={{ duration: 0.2 }}
      >
        {showContinueButton && (
          <Box
            onClick={() => navigate('/interests')}
            sx={{
              position: 'fixed',
              bottom: '5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#F7B614',
              color: 'black',
              py: '0.75rem',
              px: '2rem',
              borderRadius: '2rem',
              cursor: 'pointer',
              fontWeight: 500,
              zIndex: 11,
              '&:hover': {
                bgcolor: '#e5a913'
              }
            }}
          >
            Continue
          </Box>
        )}
      </motion.div>
    </Box>
  );
};

export default CreatorsScreen; 