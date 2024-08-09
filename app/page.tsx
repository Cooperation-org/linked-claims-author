'use client'
import { useTheme } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import { Box, Typography, useMediaQuery, Button, TextField, Autocomplete, Chip } from '@mui/material'
import SVGDesign from './Assets/SVGs'
import Link from 'next/link'
import useAutoSignOut from './hooks/useAutoSignOut'
import { useSession } from 'next-auth/react'
import { createDID, signCred } from './utils/signCred'
import { saveToGoogleDrive, StorageContext, StorageFactory } from 'trust_storage'

const interests = [
  'Digital Badges', 'Blockchain', 'Education Technology', 'Credential Innovation',
  'Open Badges', 'Learning Analytics', 'Microcredentials', 'Skill Verification'
];

const Page = () => {
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [link, setLink] = useState('')
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

const transformFormDataForCredential = (formData) => {
  return {
    fullName: formData.name,
    credentialName: `${formData.name}'s BadgeSummit 2025 Participation`,
    credentialDescription: `${formData.name} from ${formData.organization} participated in BadgeSummit 2025. Key interests: ${formData.interests.join(', ')}. ${formData.description}`,
    achievementDescription: formData.learnedContent,
    expirationDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
  };
};

const getFileIdFromLink = (link) => {
  const match = link.match(/\/d\/(.+?)\/view/);
  return match ? match[1] : null;
};

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');

      try {
        if (!session?.accessToken) {
          throw new Error('You must be signed in to submit the form');
        }

        const storage = new StorageContext(
          StorageFactory.getStorageStrategy('googleDrive', { accessToken: session.accessToken })
        );

        const newDid = await createDID(session.accessToken);
        const { didDocument, keyPair, issuerId } = newDid;
        await saveToGoogleDrive(
          storage,
          {
            didDocument,
            keyPair
          },
          'DID'
        );

// Transform the form data
    const credentialData = transformFormDataForCredential(formData);

        const signedCred = await signCred(session.accessToken, credentialData, issuerId, keyPair);
        const driveLink = `https://drive.google.com/file/d/${signedCred.id}/view`;
        setLink(driveLink);
        setSuccessMessage('Registration successful! Your credential has been signed and saved.');
      } catch (error) {
        console.error('Error during form submission:', error);
        setErrorMessage(error.message || 'An error occurred during submission. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
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
          disabled={isSubmitting}
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

{errorMessage && (
  <Typography color="error" sx={{ mt: 2 }}>
    {errorMessage}
  </Typography>
)}

{successMessage && (
  <Typography color="success" sx={{ mt: 2 }}>
    {successMessage}
  </Typography>
)}

{link && (
  <>
    <Link href={link} target="_blank" rel="noopener noreferrer">
      <Button variant="outlined" sx={{ mt: 2 }}>
        View Raw Signed Credential
      </Button>
    </Link>
<Link href={`/badges?id=${getFileIdFromLink(link)}`} passHref>
    <Button variant="outlined" sx={{ mt: 2 }}>
      View Your Credential Badge
    </Button>
  </Link>

    <Link href={link} target="_blank" rel="noopener noreferrer">
      <Button variant="outlined" sx={{ mt: 2 }}>
        Request Endorsement from Badge Summit 2025 Staff
      </Button>
    </Link>
  </>
)}


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
