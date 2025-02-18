import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import TopNav from '../components/layout/TopNav';
import CreatorCard from '../components/ui/CreatorCard';
import SeeAllCard from '../components/ui/SeeAllCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [followedCreators, setFollowedCreators] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFollowedCreators = async () => {
      if (!currentUser) return;

      try {
        const followingRef = collection(db, 'userFollowing', currentUser.uid, 'creators');
        const followingSnap = await getDocs(followingRef);
        const following = followingSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFollowedCreators(following);
      } catch (error) {
        console.error('Error fetching followed creators:', error);
      }
    };

    fetchFollowedCreators();
  }, [currentUser]);

  return (
    <Box sx={{ p: 2 }}>
      <TopNav />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Following
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex',
        gap: 2,
        overflowX: 'auto',
        pb: 2,
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {followedCreators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
        <SeeAllCard />
      </Box>
    </Box>
  );
};

export default Home; 