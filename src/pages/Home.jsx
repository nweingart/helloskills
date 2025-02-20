import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TopNav from '../components/layout/TopNav';
import CreatorCard from '../components/ui/CreatorCard';
import SeeAllCard from '../components/ui/SeeAllCard';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RecommendIcon from '@mui/icons-material/Recommend';

const ScrollableRow = ({ title, creators, titleColor }) => (
  <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 2, sm: 3 },
    mb: { xs: 3, sm: 4 }
  }}>
    <Typography 
      variant="h5" 
      sx={{ 
        fontWeight: 600,
        px: { xs: 2, sm: 3 },
        color: titleColor,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      {title} {title === "Trending" ? 
        <TrendingUpIcon sx={{ ml: 1 }} /> : 
        <RecommendIcon sx={{ ml: 1 }} />
      }
    </Typography>

    <Box sx={{ 
      display: 'flex',
      gap: { xs: 1.5, sm: 2 },
      overflowX: 'auto',
      pb: { xs: 2, sm: 3 },
      pl: { xs: 2, sm: 3 },
      pr: 0,  // Remove right padding to allow peek
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      '& > *': {
        width: { xs: '200px', sm: '240px' },  // Smaller fixed width
        flexShrink: 0
      }
    }}>
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
      <SeeAllCard />
    </Box>
  </Box>
);

ScrollableRow.propTypes = {
  title: PropTypes.string.isRequired,
  creators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired
    })
  ).isRequired,
  titleColor: PropTypes.string.isRequired
};

const Home = () => {
  const [recommendedCreators, setRecommendedCreators] = useState([]);
  const [trendingCreators, setTrendingCreators] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchGurus = async () => {
      try {
        const gurusRef = collection(db, 'Gurus');
        const gurusSnapshot = await getDocs(gurusRef);
        const allGurus = gurusSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        const sortedGurus = [...allGurus].sort((a, b) => b.rating - a.rating);
        setRecommendedCreators(sortedGurus.slice(0, 4));
        
        const remainingGurus = sortedGurus.slice(4);
        const shuffled = remainingGurus.sort(() => Math.random() - 0.5);
        setTrendingCreators(shuffled.slice(0, 4));
        
      } catch (error) {
        console.error('Error fetching gurus:', error);
      }
    };

    fetchGurus();
  }, [currentUser]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        maxWidth: '100vw',
        overflow: 'hidden',
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
          )
        `,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <TopNav />
      
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Box sx={{ pt: { xs: 2, sm: 3 } }}>
          <ScrollableRow 
            title="Recommended" 
            creators={recommendedCreators}
            titleColor="white"
          />
          <ScrollableRow 
            title="Trending" 
            creators={trendingCreators}
            titleColor="white"
          />
        </Box>
        
        <Box 
          sx={{ 
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 3 },
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 'auto'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: { xs: 2, sm: 0 }
          }}>
            {/* Mock Links */}
            <Box sx={{ 
              display: 'flex',
              gap: { xs: 2, sm: 4 },
              mb: { xs: 2, sm: 0 }
            }}>
              <Typography 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  '&:hover': { color: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                About
              </Typography>
              <Typography 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  '&:hover': { color: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                Privacy
              </Typography>
              <Typography 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  '&:hover': { color: 'rgba(255, 255, 255, 0.9)' }
                }}
              >
                Terms
              </Typography>
            </Box>

            {/* Copyright */}
            <Typography 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.875rem',
                textAlign: { xs: 'center', sm: 'right' }
              }}
            >
              © {new Date().getFullYear()} HelloSkills. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home; 