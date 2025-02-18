import { Box, Typography, Avatar } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaTiktok } from 'react-icons/fa';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';

const CreatorCard = ({ creator }) => {
  const { name, avatar, category, rating, socials } = creator;
  
  return (
    <Box
      sx={{
        width: 160,
        height: 220,
        flexShrink: 0,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.08)',
        }
      }}
    >
      <Avatar 
        src={avatar} 
        alt={name}
        sx={{ 
          width: 80, 
          height: 80,
          mb: 2,
          border: '2px solid rgba(255,255,255,0.1)'
        }}
      />
      
      <Typography
        sx={{
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: 500,
          textAlign: 'center',
          mb: 1
        }}
      >
        {name}
      </Typography>

      <Typography
        sx={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.8rem',
          mb: 1
        }}
      >
        #{category}
      </Typography>

      {socials && socials[0] && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 1
        }}>
          {socials[0].platform === 'instagram' ? (
            <InstagramIcon sx={{ color: 'white', fontSize: 16 }} />
          ) : (
            <FaTiktok style={{ color: 'white', fontSize: 14 }} />
          )}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '0.75rem'
            }}
          >
            {socials[0].handle}
          </Typography>
        </Box>
      )}

      {rating && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5,
          mt: 'auto'
        }}>
          <StarIcon sx={{ color: '#F7B614', fontSize: '1rem' }} />
          <Typography
            sx={{
              color: 'white',
              fontSize: '0.8rem'
            }}
          >
            {rating}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

CreatorCard.propTypes = {
  creator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.string,
    socials: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.oneOf(['instagram', 'tiktok']).isRequired,
        handle: PropTypes.string.isRequired
      })
    )
  }).isRequired
};

export default CreatorCard; 