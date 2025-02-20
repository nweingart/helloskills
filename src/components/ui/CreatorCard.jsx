import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { FaTiktok } from 'react-icons/fa';

const CreatorCard = ({ creator }) => {
  console.log('Creator data received:', creator);
  console.log('Avatar URL:', creator.avatar);

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <InstagramIcon sx={{ fontSize: '1.2rem' }} />;
      case 'youtube':
        return <YouTubeIcon sx={{ fontSize: '1.2rem' }} />;
      case 'tiktok':
        return <FaTiktok size="1.1rem" />;
      case 'x':
      case 'twitter':
        return <TwitterIcon sx={{ fontSize: '1.2rem' }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minWidth: '280px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        p: 2
      }}
    >
      {/* Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <Box
          component="img"
          src={creator.avatar}
          alt={creator.name}
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px solid #F7B614',
            mr: 1.5
          }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
            {creator.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              color: '#F7B614' 
            }}
          >
            ★ {creator.rating}
          </Typography>
        </Box>
      </Box>

      {/* Categories/Hashtags */}
      {creator.categories && (
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1,
          mb: 1.5
        }}>
          {creator.categories.map((category, index) => (
            <Typography
              key={index}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                px: 1,
                py: 0.5,
                borderRadius: '12px',
              }}
            >
              #{category}
            </Typography>
          ))}
        </Box>
      )}

      {/* Social Links */}
      {creator.socials && (
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          {creator.socials.map((social, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 0.5
              }}
            >
              {getSocialIcon(social.platform)}
              <Typography sx={{ fontSize: '0.75rem' }}>
                {social.handle}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

CreatorCard.propTypes = {
  creator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string),
    socials: PropTypes.arrayOf(PropTypes.shape({
      platform: PropTypes.oneOf(['instagram', 'youtube', 'tiktok', 'x', 'twitter']).isRequired,
      handle: PropTypes.string.isRequired
    }))
  }).isRequired
};

export default CreatorCard; 