import { Box, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';

const MutualCard = ({ profileImage, name, connection, stats }) => {
  return (
    <Box
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
        padding: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.08)',
        }
      }}
    >
      <Avatar
        src={profileImage}
        sx={{
          width: 80,
          height: 80,
          mb: 2,
          border: '2px solid rgba(247, 182, 20, 0.5)'
        }}
      />
      
      <Typography 
        sx={{ 
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 600,
          mb: 0.5,
          textAlign: 'center',
          letterSpacing: '-0.01em'
        }}
      >
        {name}
      </Typography>

      <Typography 
        sx={{ 
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.75rem',
          mb: 1,
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400
        }}
      >
        {connection}
      </Typography>
      
      <Typography 
        sx={{ 
          color: '#F7B614',
          fontSize: '0.75rem',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          whiteSpace: 'nowrap'
        }}
      >
        {stats}
      </Typography>
    </Box>
  );
};

MutualCard.propTypes = {
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  connection: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired
};

export default MutualCard; 