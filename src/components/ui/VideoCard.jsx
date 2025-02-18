import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const VideoCard = ({ thumbnail, date }) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'rgba(0,0,0,0.2)',
        mb: 1
      }}
    >
      {/* Thumbnail */}
      <Box
        component="img"
        src={thumbnail}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      
      {/* Date Chip */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          bgcolor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: 4,
          px: 1.5,
          py: 0.5,
        }}
      >
        <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
          {date}
        </Typography>
      </Box>
    </Box>
  );
};

VideoCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default VideoCard; 