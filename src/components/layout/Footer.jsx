import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        px: 4,
        py: 3.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: '#404040',
      }}
    >
      {/* Links Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
      }}>
        {/* Company */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ 
            color: 'white', 
            fontSize: '0.7rem', 
            fontWeight: 600, 
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Company
          </Typography>
          <Link href="#" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>About</Link>
          <Link href="#" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>Careers</Link>
        </Box>

        {/* Support */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ 
            color: 'white', 
            fontSize: '0.7rem', 
            fontWeight: 600, 
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Support
          </Typography>
          <Link href="#" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>Help</Link>
          <Link href="#" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>Safety</Link>
        </Box>

        {/* Legal */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ 
            color: 'white', 
            fontSize: '0.7rem', 
            fontWeight: 600, 
            fontFamily: 'Inter, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Legal
          </Typography>
          <Link href="#" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>Terms</Link>
          <Link href="#" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>Privacy</Link>
        </Box>
      </Box>

      {/* Copyright */}
      <Typography 
        sx={{ 
          color: 'rgba(255,255,255,0.4)', 
          fontSize: '0.7rem',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          mt: 1
        }}
      >
        © 2024 HelloSkills
      </Typography>
    </Box>
  );
};

export default Footer; 