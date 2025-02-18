import { Box, Avatar, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaTiktok } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';

const CreatorRow = ({ creator, onFollow, isFollowing }) => {
  const { name, avatar, rating, socials } = creator;
  
  console.log('🎭 CreatorRow rendering for:', creator.name);
  console.log('👀 isFollowing prop:', isFollowing);

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'flex-start',
      gap: { xs: '0.75rem', sm: '1rem' },
      p: { xs: '0.75rem', sm: '1rem' },
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.02)'
      }
    }}>
      <Avatar 
        src={avatar} 
        sx={{ 
          width: { xs: '3.5rem', sm: '4rem' },
          height: { xs: '3.5rem', sm: '4rem' },
          flexShrink: 0,
          border: '2px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)'
        }}
      />
      
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '0.375rem', sm: '0.5rem' },
        minWidth: 0  // Prevents flex items from overflowing
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '0.5rem'
        }}>
          <Typography sx={{ 
            color: 'white',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {name}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '0.25rem',
            flexShrink: 0
          }}>
            <Typography sx={{ 
              color: 'white',
              fontFamily: '"Gloria Hallelujah", cursive',
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}>
              {rating}
            </Typography>
            <StarIcon sx={{ 
              color: 'white', 
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }} />
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '0.25rem', sm: '0.375rem' }
        }}>
          {socials.map((social, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: { xs: '0.375rem', sm: '0.5rem' }
              }}
            >
              {social.platform === 'instagram' ? (
                <Box sx={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  borderRadius: '50%',
                  width: { xs: '1.25rem', sm: '1.5rem' },
                  height: { xs: '1.25rem', sm: '1.5rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <InstagramIcon sx={{ 
                    color: 'white', 
                    fontSize: { xs: '0.75rem', sm: '1rem' }
                  }} />
                </Box>
              ) : (
                <Box sx={{
                  bgcolor: 'black',
                  borderRadius: '50%',
                  width: { xs: '1.25rem', sm: '1.5rem' },
                  height: { xs: '1.25rem', sm: '1.5rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <FaTiktok style={{ 
                    color: 'white', 
                    fontSize: '0.75rem' 
                  }} />
                </Box>
              )}
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {social.handle}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        onClick={(e) => {
          e.stopPropagation();
          console.log('🖱️ Follow icon clicked for:', creator.name);
          onFollow();
        }}
        sx={{
          position: 'absolute',
          bottom: { xs: '0.75rem', sm: '1rem' },
          right: { xs: '0.75rem', sm: '1rem' },
          cursor: 'pointer',
          opacity: isFollowing ? 0.6 : 1,
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '1.5rem', sm: '2rem' },
          height: { xs: '1.5rem', sm: '2rem' },
          borderRadius: '50%',
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            opacity: 0.8,
            bgcolor: 'rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        {isFollowing ? (
          <CheckIcon sx={{ 
            color: 'white', 
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }} />
        ) : (
          <AddIcon sx={{ 
            color: 'white', 
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }} />
        )}
      </Box>
    </Box>
  );
};

CreatorRow.propTypes = {
  creator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    socials: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.oneOf(['instagram', 'tiktok']).isRequired,
        handle: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  onFollow: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default CreatorRow; 