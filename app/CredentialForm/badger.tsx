import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Autocomplete, Chip } from '@/components/ui/';

const interests = [
  'Digital Badges', 'Blockchain', 'Education Technology', 'Credential Innovation',
  'Open Badges', 'Learning Analytics', 'Microcredentials', 'Skill Verification'
];

const BadgeConferenceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interests: [],
    description: '',
    learnedContent: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleInterestsChange = (event, newValue) => {
    setFormData(prevData => ({ ...prevData, interests: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        BadgeSummit 2025 Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
        />
        <Autocomplete
          multiple
          options={interests}
          value={formData.interests}
          onChange={handleInterestsChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Interests"
              placeholder="Select your interests"
              margin="normal"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          }
        />
        <TextField
          fullWidth
          margin="normal"
          label="Brief Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange}
          helperText="Describe yourself or key interests that brought you to the BadgeSummit 2025"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Learned Content"
          name="learnedContent"
          multiline
          rows={3}
          value={formData.learnedContent}
          onChange={handleChange}
          helperText="Describe something you learned or appreciated from a presentation (for LinkedClaims credential)"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default BadgeConferenceForm;
