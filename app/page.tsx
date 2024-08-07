'use client'
import { useTheme } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import { Box, Typography, useMediaQuery, Button, TextField, Autocomplete, Chip } from '@mui/material'
import SVGDesign from './Assets/SVGs'
import Link from 'next/link'
import useAutoSignOut from './hooks/useAutoSignOut'

const interests = [
  'Digital Badges', 'Blockchain', 'Education Technology', 'Credential Innovation',
  'Open Badges', 'Learning Analytics', 'Microcredentials', 'Skill Verification'
];

const Page = () => {
  const theme = useTheme()
  const [accessToken, setAccessToken] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interests: [],
    description: '',
    learnedContent: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'))
    }
  }, [])

  useAutoSignOut()

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '37px',
        alignItems: 'center',
        padding: { xs: '20px', md: '40px' },
        maxWidth: '800px',
        margin: 'auto'
      }}
    >
      {/* Header Component */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            color: theme.palette.t3DarkSlateBlue,
            fontFamily: 'Poppins',
            fontSize: { xs: '30px', md: '48px' },
            fontWeight: 600,
            lineHeight: '110%'
          }}
        >
          BadgeSummit 2025 Attendee Badge
        </Typography>
        <Typography
          sx={{
            color: theme.palette.t3DarkSlateBlue,
            fontFamily: 'Lato',
            fontSize: { xs: '16px', md: '18px' },
            fontWeight: 400,
            lineHeight: 'normal',
            maxWidth: '600px'
          }}
        >
          Are you attending badge summit? Create your personalized credential for endorsement!
        </Typography>
      </Box>

      {/* Registration Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
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
          sx={{
            backgroundColor: theme.palette.t3ButtonBlue,
            color: 'white',
            '&:hover': {
              backgroundColor: theme.palette.t3ButtonBlue
            }
          }}
        >
          Self-Issue Attendance Badge
        </Button>
      </Box>

      {/* Building Section Component */}
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          textAlign: 'center',
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          marginTop: { xs: '40px', md: '60px' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            zIndex: 3,
            left: 'calc(50% - 193px)',
            top: 'calc(50% - 108px)'
          }}
        >
          <SVGDesign />
        </Box>
        <Typography
          sx={{
            color: theme.palette.t3DarkSlateBlue,
            fontFamily: 'Poppins',
            fontWeight: 600,
            lineHeight: '125%',
            fontSize: { xs: '20px', md: '24px' },
            padding: { xs: '0 20px', md: '0 50px' }
          }}
        >
          Create your story.  Control your credentials.
        </Typography>
        <Typography
          sx={{
            color: theme.palette.t3BodyText,
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: 'normal',
            fontSize: { xs: '16px', md: '18px' },
            padding: { xs: '0 10px', md: '0 30px' }
          }}
        >
        </Typography>
      </Box>

      {/* Links */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginTop: '20px'
        }}
      >
        <Link href='/claims'>
          <Button
            sx={{
              fontSize: '1.1rem',
              color: theme.palette.t3ButtonBlue
            }}
          >
            View Your Claims
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Page
