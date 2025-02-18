import { useState } from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TopNav from '../components/layout/TopNav';
import Footer from '../components/layout/Footer';
import CreatorCard from '../components/ui/CreatorCard';

// Mock data - we can move this to a separate file later
const MOCK_CREATORS = [
  {
    id: 1,
    name: 'Sarah Chen',
    skills: ['Photography', 'Videography'],
    profileImage: '/images/creators/sarah.jpg',
    topSocial: '@sarahchen • 12.4k'
  },
  {
    id: 2,
    name: 'Alex Rivera',
    skills: ['Motion Design', 'After Effects'],
    profileImage: '/images/creators/alex.jpg',
    topSocial: '@arivera • 8.2k'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    skills: ['UI Design', 'Figma'],
    profileImage: '/images/creators/mike.jpg',
    topSocial: '@mikej • 15.1k'
  }
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCreators, setFilteredCreators] = useState(MOCK_CREATORS);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = MOCK_CREATORS.filter(creator => 
      creator.name.toLowerCase().includes(lowercaseQuery) ||
      creator.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
      creator.topSocial.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredCreators(filtered);
  };

  return (
    <Box sx={{ 
      maxWidth: '100vw',
      minHeight: '100vh',
      backgroundColor: '#1A1A1A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{ 
        width: '414px', 
        height: '896px',
        backgroundColor: '#404040',
        borderRadius: '40px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)'
      }}>
        <Box sx={{
          height: '100%',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
        }}>
          <TopNav />
          
          <Box sx={{ px: 4, py: 3 }}>
            <Typography sx={{ 
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 600,
              mb: 3,
              fontFamily: 'Inter, sans-serif'
            }}>
              Explore
            </Typography>

            {/* Search Bar */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              px: 2,
              mb: 3,
            }}>
              <InputBase
                placeholder="Search by name, skill, or social handle"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                sx={{
                  flex: 1,
                  color: 'white',
                  py: 1,
                  fontFamily: 'Inter, sans-serif',
                  '& input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 1
                  }
                }}
              />
              <IconButton sx={{ color: 'rgba(255,255,255,0.5)' }}>
                <SearchIcon />
              </IconButton>
            </Box>

            {/* Results */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {filteredCreators.length === 0 ? (
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  textAlign: 'center',
                  py: 4,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  No creators found
                </Typography>
              ) : (
                filteredCreators.map(creator => (
                  <CreatorCard
                    key={creator.id}
                    name={creator.name}
                    skills={creator.skills}
                    profileImage={creator.profileImage}
                    topSocial={creator.topSocial}
                  />
                ))
              )}
            </Box>
          </Box>

          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Explore; 