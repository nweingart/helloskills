import { useState } from 'react';
import { Box, Typography, InputBase, Chip, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TopNav from '../components/layout/TopNav';
import Footer from '../components/layout/Footer';

const MOCK_GURUS = [
  {
    id: 1,
    name: 'Pablo Stanley',
    skills: ['Food'],
    rating: 4.9,
    socials: [
      { platform: 'tiktok', handle: '@thefoodvoyager' },
      { platform: 'instagram', handle: '@mintnberries' }
    ],
    profileImage: '/images/creators/pablo.jpg'
  },
  {
    id: 2,
    name: 'Leah Smith',
    skills: ['Music', 'Art'],
    rating: 4.9,
    socials: [
      { platform: 'tiktok', handle: '@ladybird909' }
    ],
    profileImage: '/images/creators/leah.jpg'
  },
  {
    id: 3,
    name: 'Jay Miller',
    skills: ['Photography'],
    rating: 4.0,
    socials: [
      { platform: 'tiktok', handle: '@snappy_happy' }
    ],
    profileImage: '/images/creators/jay.jpg'
  }
];

const Find = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredGurus = MOCK_GURUS;

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
        height: '90vh',
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
              color: '#F7B614',
              fontSize: '2rem',
              fontWeight: 600,
              mb: 4,
              fontFamily: 'Inter, sans-serif'
            }}>
              Find Skill Gurus
            </Typography>

            {/* Search Bar */}
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 4
            }}>
              <Box sx={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '12px',
                px: 2,
              }}>
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />
                <InputBase
                  placeholder="Name, Insta or TikTok handle"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              </Box>
              <Chip 
                label="#Skill" 
                sx={{ 
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: '12px',
                  height: '40px',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </Box>

            {/* Guru List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {filteredGurus.map(guru => (
                <Box key={guru.id} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar 
                    src={guru.profileImage} 
                    sx={{ 
                      width: 60, 
                      height: 60,
                      border: '2px solid #F7B614'
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography sx={{ 
                        color: 'white',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {guru.name}
                      </Typography>
                      <Typography sx={{ 
                        color: 'white',
                        fontSize: '1rem',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {guru.rating} ★
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      {guru.skills.map(skill => (
                        <Typography 
                          key={skill} 
                          sx={{ 
                            color: '#F7B614',
                            fontSize: '0.9rem',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          #{skill}
                        </Typography>
                      ))}
                    </Box>
                    {guru.socials.map(social => (
                      <Typography 
                        key={social.handle}
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: '0.9rem',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {social.handle}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default Find; 