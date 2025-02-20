import { Box, Avatar, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';

const getSocialIcon = (platform) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return {
        icon: <InstagramIcon sx={{ color: 'white', fontSize: { xs: '0.75rem', sm: '1rem' } }} />,
        style: {
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
        }
      };
    case 'tiktok':
      return {
        icon: <FaTiktok style={{ color: 'white', fontSize: '0.75rem' }} />,
        style: { 
          backgroundColor: '#000000'
        }
      };
    case 'x':
      return {
        icon: <FaXTwitter style={{ color: 'white', fontSize: '0.75rem' }} />,
        style: { 
          backgroundColor: '#000000'
        }
      };
    case 'youtube':
      return {
        icon: <FaYoutube style={{ color: 'white', fontSize: '0.75rem' }} />,
        style: { 
          backgroundColor: '#FF0000'
        }
      };
    default:
      return {
        icon: <FaTiktok style={{ color: 'white', fontSize: '0.75rem' }} />,
        style: { 
          backgroundColor: '#000000'
        }
      };
  }
};

const CreatorRow = ({ creator, onFollow, isFollowing }) => {
  console.log('🎭 CreatorRow rendering for:', creator.name);
  console.log('👀 isFollowing prop:', isFollowing);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: { xs: '0.75rem', sm: '1rem' },
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '0.75rem', sm: '1rem' },
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Avatar 
        src={creator.avatar} 
        sx={{ 
          width: { xs: '4.25rem', sm: '4.75rem' },
          height: { xs: '4.25rem', sm: '4.75rem' },
          flexShrink: 0,
          border: '2px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)'
        }}
      />
      
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '0.375rem', sm: '0.5rem' },
        minWidth: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ 
            fontWeight: 500,
            color: 'white',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontFamily: 'Roboto, sans-serif'
          }}>
            {creator.name}
          </Typography>
          {creator.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem', ml: 'auto' }}>
              <Typography sx={{ 
                color: 'white',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontFamily: '"Gloria Hallelujah", cursive'
              }}>
                {creator.rating}
              </Typography>
              <StarIcon sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' } }} />
            </Box>
          )}
        </Box>

        {creator.categories && creator.categories.length > 0 && (
          <Typography sx={{ 
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            fontFamily: 'Roboto, sans-serif'
          }}>
            #{creator.categories[0]}
          </Typography>
        )}

        {creator.socials && (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            {creator.socials.slice(0, 2).map((social, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: { xs: '0.375rem', sm: '0.5rem' }
                }}
              >
                <Box sx={{
                  borderRadius: '25%',
                  width: { xs: '1rem', sm: '1.25rem' },
                  height: { xs: '1rem', sm: '1.25rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  ...getSocialIcon(social.platform).style
                }}>
                  {getSocialIcon(social.platform).icon}
                </Box>
                <Typography sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontFamily: 'Roboto, sans-serif'
                }}>
                  {social.handle}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          console.log('+ clicked, creator:', creator);
          console.log('isFollowing status:', isFollowing);
          console.log('onFollow prop exists:', !!onFollow);
          onFollow(creator);
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
        {isFollowing ? <CheckIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: 'white' }} />}
      </IconButton>
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
        platform: PropTypes.oneOf(['instagram', 'tiktok', 'x', 'youtube']).isRequired,
        handle: PropTypes.string.isRequired
      })
    ).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  onFollow: PropTypes.func.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default CreatorRow; 