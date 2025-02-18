import { Box } from '@mui/material';

const AuthBackground = () => {
  // Updated path to use public folder
  const images = Array.from({ length: 16 }, (_, i) => 
    `/influencers/${i + 1}.jpeg`
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        zIndex: 0,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1
        }
      }}
    >
      {images.map((url, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box
            component="img"
            src={url}
            alt={`Background ${index + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default AuthBackground; 