import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

const InfluencerUpload = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!jsonInput.trim()) {
      alert('Please enter creator data');
      return;
    }

    setIsUploading(true);
    try {
      const creatorData = JSON.parse(jsonInput);
      
      // Add timestamps
      const dataToUpload = {
        ...creatorData,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        featured: creatorData.featured || false
      };

      await addDoc(collection(db, 'creators'), dataToUpload);
      alert('Creator uploaded successfully!');
      setJsonInput('');
    } catch (error) {
      console.error('Error uploading creator:', error);
      alert('Error: Invalid JSON format or upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ 
      p: 3, 
      maxWidth: 800, 
      mx: 'auto',
      minHeight: '100vh',
      bgcolor: '#1A1A1A'
    }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
          Upload Creator
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
          Paste creator data in JSON format:
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={15}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`{
  "name": "Pablo Stanley",
  "username": "@pablostanley",
  "bio": "Food creator and culinary explorer...",
  "categories": ["Food", "Cooking", "Travel"],
  "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  "rating": "4.9",
  "socials": [
    { 
      "platform": "tiktok",
      "handle": "@thefoodvoyager",
      "followers": "1.2M"
    },
    { 
      "platform": "instagram",
      "handle": "@mintnberries",
      "followers": "850K"
    }
  ]
}`}
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(255,255,255,0.03)',
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255,255,255,0.7)'
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
              fontFamily: 'monospace'
            }
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleUpload}
          disabled={isUploading || !jsonInput.trim()}
          sx={{ 
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload Creator'}
        </Button>
      </Paper>
    </Box>
  );
};

export default InfluencerUpload; 