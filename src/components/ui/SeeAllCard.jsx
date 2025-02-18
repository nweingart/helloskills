import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const SeeAllCard = ({ route, title = 'See All', subtitle = 'View all items' }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(route)}
      sx={{
        width: 160,
        height: 200,
        flexShrink: 0,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'rgba(255,255,255,0.05)',
        mb: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.08)',
        }
      }}
    >
      <Typography 
        sx={{ 
          color: '#F7B614',
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 600,
          mb: 1
        }}
      >
        {title}
      </Typography>
      <Typography 
        sx={{ 
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.75rem',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

SeeAllCard.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default SeeAllCard; 