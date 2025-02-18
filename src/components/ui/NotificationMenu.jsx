import { Box, Typography, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PropTypes from 'prop-types';

const NotificationMenu = ({ notifications, onClear, onClose }) => {
  const handleMarkAsRead = (id) => {
    onClear([id]);
  };

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1050,
        }}
      />

      {/* Menu */}
      <Box
        sx={{
          position: 'absolute',
          top: 70,
          left: 0,
          width: '100%',
          backgroundColor: '#2A2A2A',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ 
          px: 4,
          py: 3,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ 
              color: 'white', 
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif'
            }}>
              Notifications
            </Typography>
            {notifications.some(n => n.unread) && (
              <Box sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#F7B614',
              }}/>
            )}
          </Box>
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'rgba(255,255,255,0.6)',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Notifications List */}
        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
        }}>
          {notifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                px: 4,
                py: 3,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: notification.unread ? 'rgba(247, 182, 20, 0.05)' : 'transparent',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.05)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {notification.profileImage ? (
                  <Avatar 
                    src={notification.profileImage} 
                    sx={{ width: 40, height: 40 }}
                  />
                ) : (
                  <Box sx={{ width: 40, height: 40 }} />
                )}
                {notification.unread && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#F7B614',
                      border: '2px solid #2A2A2A'
                    }}
                  />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: notification.unread ? 600 : 400,
                  mb: 0.5,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {notification.title}
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.8rem',
                  mb: 1,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {notification.message}
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {notification.time}
                </Typography>
              </Box>
              {notification.unread && (
                <IconButton
                  onClick={() => handleMarkAsRead(notification.id)}
                  sx={{ 
                    color: 'rgba(255,255,255,0.4)',
                    '&:hover': { 
                      color: '#F7B614',
                      backgroundColor: 'rgba(247, 182, 20, 0.1)'
                    }
                  }}
                >
                  <CheckCircleOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

NotificationMenu.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    unread: PropTypes.bool.isRequired,
    profileImage: PropTypes.string
  })).isRequired,
  onClear: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NotificationMenu; 