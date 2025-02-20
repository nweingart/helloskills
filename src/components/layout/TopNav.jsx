import { Box, IconButton, Avatar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NotificationMenu from '../ui/NotificationMenu';
import { useAuth } from '../../context/AuthContext';

const TopNav = () => {
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

  const { currentUser } = useAuth();

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

  const getInitials = (email) => {
    if (!email) return '??';
    // Get username part of email (before @)
    const username = email.split('@')[0];
    // Split by common separators (., _, -)
    const parts = username.split(/[._-]/);
    
    if (parts.length >= 2) {
      // If we have multiple parts, take first letter of first and last parts
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else {
      // If single word, take first two letters
      return (username.length > 1 ? username.slice(0, 2) : username + '?').toUpperCase();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1.5,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Bumbbled, cursive',
            color: '#E5A913',
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            textAlign: 'center'
          }}
        >
          helloskills
        </Typography>
      </Link>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
        
        <Link to="/profile">
          <Avatar
            sx={{
              bgcolor: '#F7B614',
              color: 'black',
              width: 32,
              height: 32,
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {getInitials(currentUser?.email)}
          </Avatar>
        </Link>
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