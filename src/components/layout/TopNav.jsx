import { Box, IconButton, Avatar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NotificationMenu from '../ui/NotificationMenu';

const TopNav = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'comment',
      title: 'New Comment Waiting',
      message: 'Your latest video has a comment waiting for review.',
      time: '2m ago',
      unread: true,
      clearable: false,
      profileImage: '/images/creators/sarah.jpg'
    }
  ]);

  const hasUnreadNotifications = notifications.some(n => n.unread);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleNotificationsClear = (clearedIds) => {
    setNotifications(notifications.map(notification => 
      clearedIds.includes(notification.id) 
        ? { ...notification, unread: false }
        : notification
    ));
  };

  return (
    <Box sx={{ 
      px: 4,
      py: 3.5,
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      backgroundColor: '#404040',
      zIndex: 1000,
    }}>
      {/* Brand */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: '#F7B614',
          fontFamily: '"Dancing Script", cursive',
          fontSize: '1.8rem',
          textTransform: 'lowercase',
          letterSpacing: '0.01em',
        }}
      >
        helloskills
      </Typography>

      {/* Right Side Icons */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2.5
      }}>
        <Box sx={{ position: 'relative' }}>
          <IconButton 
            onClick={handleNotificationClick}
            sx={{ 
              color: 'white',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              }
            }}
          >
            <NotificationsIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
          {hasUnreadNotifications && (
            <Box
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                minWidth: '18px',
                height: '18px',
                borderRadius: '9px',
                backgroundColor: '#F7B614',
                color: '#000',
                fontSize: '0.7rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                fontFamily: 'Inter, sans-serif',
                border: '2px solid #404040'
              }}
            >
              1
            </Box>
          )}
        </Box>
        
        <Avatar 
          onClick={() => navigate('/profile')}
          sx={{ 
            width: 36,
            height: 36,
            cursor: 'pointer',
            '&:hover': { 
              opacity: 0.8 
            }
          }}
        />
      </Box>

      {/* Notification Menu */}
      {showNotifications && (
        <NotificationMenu 
          notifications={notifications}
          onClear={handleNotificationsClear}
          onClose={() => setShowNotifications(false)} 
        />
      )}
    </Box>
  );
};

export default TopNav; 