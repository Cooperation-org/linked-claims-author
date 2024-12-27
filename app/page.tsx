'use client'
import React from 'react'
import { Box, Button, Typography, useTheme, useMediaQuery, Theme } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
interface SectionProps {
  theme: Theme //NOSONAR
}

const STEPS = [
  {
    id: 'capture',
    title: '1. Capture your skills',
    icon: '/Document.svg',
    description:
      'Add your experiences, from school activities, caregiving, volunteering, to special projects and more.'
  },
  {
    id: 'validate',
    title: '2. Add validation',
    icon: '/Human Insurance.svg',
    description:
      'Upload proof of your skills and request recommendations from trusted connections.'
  },
  {
    id: 'share',
    title: '3. Share',
    icon: '/Network.svg',
    description:
      'Share your skills with employers, add them to your resume, or to your LinkedIn profile.'
  }
]

const OPENCREDS_FEATURES = [
  { id: 'verifiable', text: 'Verifiable' },
  { id: 'shareable', text: 'Shareable' },
  { id: 'tamper-proof', text: 'Tamper proof' },
  { id: 'beautiful', text: 'Presented beautifully' },
  { id: 'ownership', text: 'Owned by you' },
  { id: 'control', text: 'You control access' },
  { id: 'no-degree', text: "Don't require a degree" }
]

const HeroSection: React.FC<SectionProps & { showCards: boolean }> = ({ showCards }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        ml: 'auto',
        mr: 'auto',
        width: { xs: '100%', md: '100%' },
        maxWidth: '1400px',
        px: { xs: 2, md: 'auto' },
        pb: 4,
        pt: { xs: '43px', md: '75px' }
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '40vw' },
          maxWidth: { xs: '100%', md: '771px' },
          textAlign: 'left',
          alignSelf: { xs: 'center', md: 'flex-start' },
          pr: { xs: 0, md: 0 },
          mr: { xs: 0, md: '71px' },
          height: { xs: 'auto', md: '432px' }
          // mt: { xs: '43px', md: 0 }
        }}
      >
        <Typography
          variant='h2'
          sx={{
            color: theme.palette.t3Black,
            mb: { xs: '15px', md: '10px' },
            fontFamily: 'poppins',
            fontSize: { xs: '30px', md: '50px' },
            fontWeight: 'bolder',
            lineHeight: { xs: '37.5px', md: '62.5px' },
            maxWidth: { xs: '360px', md: '771px' }
          }}
        >
          {isMobile ? (
            'Showcase the skills that define you.'
          ) : (
            <>
              Showcase the skills
              <br />
              that define you.
            </>
          )}
        </Typography>

        <Typography
          variant='body1'
          sx={{
            color: theme.palette.t3BodyText,
            mb: '30px',
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: '22.5px'
          }}
        >
          {isMobile ? (
            'Whether it’s caring for your family, volunteering, a side hustle, or on-the-job learning, OpenCreds helps you document, verify, and share your unique experiences.'
          ) : (
            <>
              Whether it&apos;s caring for your family, volunteering, a side hustle,
              <br />
              or on-the-job learning, OpenCreds helps you document, verify,
              <br />
              and share your unique experiences.
            </>
          )}
        </Typography>

        <Link href='/credentialForm' passHref>
          <Button
            variant='contained'
            sx={{
              backgroundColor: theme.palette.t3ButtonBlue,
              color: '#FFFFFF',
              width: { xs: '195px', md: '177px' },
              maxWidth: { xs: '195px', md: '177px' },
              maxHeight: { xs: '40px', md: '52px' },
              borderRadius: '100px',
              py: '22px',
              px: '20px',
              textTransform: 'none',
              fontSize: '16px',
              fontFamily: 'Roboto',
              lineHeight: '20px',
              fontWeight: '500',
              mb: { xs: '19px', md: 0 }
            }}
          >
            Build your first skill
          </Button>
        </Link>
      </Box>

      {showCards && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image priority src='/3Cards.svg' alt='cards' width={559} height={467}></Image>
        </Box>
      )}
    </Box>
  )
}

const MobileOpenCredsSection: React.FC<SectionProps> = ({ theme }) => (
  <Box
    sx={{
      background: 'linear-gradient(180deg, #F1F5FC, #FFFFFF)',
      py: '15px',
      px: { xs: '10px', md: 8 },
      mt: '15px'
    }}
  >
    <Typography
      variant='h4'
      sx={{
        color: theme.palette.t3Black,
        textAlign: { xs: 'left', md: 'center' },
        mb: '22.5px',
        fontFamily: 'poppins',
        fontSize: '22px',
        fontWeight: '700'
      }}
    >
      What are OpenCreds?
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '15px',
        pt: '15px',
        pb: '30px'
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant='body1'
          sx={{
            color: theme.palette.t3BodyText,
            mb: '15px',
            fontSize: '18px',
            fontWeight: 700
          }}
        >
          OpenCreds are verifiable skills that you create to showcase your experiences.
          <br />
          <br />
          OpenCreds are:
        </Typography>
        <Box
          component='ul'
          sx={{
            color: theme.palette.t3BodyText,
            pl: 2,
            mb: 0,
            fontSize: '14px',
            fontWeight: 400
          }}
        >
          {OPENCREDS_FEATURES.map(feature => (
            <Typography key={feature.id} component='li' variant='body2'>
              {feature.text}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box sx={{ height: '100%', width: 'auto' }}>
        <Image priority src='/1Card.svg' alt='openCreds' width={131} height={304}></Image>
      </Box>
    </Box>
  </Box>
)

const StepsSection: React.FC<SectionProps> = ({ theme }) => (
  <Box sx={{ maxWidth: '1400px', mr: 'auto', ml: 'auto' }}>
    <Box
      sx={{
        display: 'flex',
        width: { xs: '92.308vw', md: '360px' },
        height: '39px',
        mr: 'auto',
        ml: 'auto',
        mt: { xs: '15px', md: '60px' },
        mb: '15px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          color: theme.palette.t3Black,
          fontSize: '22px',
          pb: '10px',
          px: '15px',
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '27.5px'
        }}
      >
        How it works - 3 simple steps
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 },
        px: { xs: '17.5px', md: 8 },
        mb: { xs: '15px', md: '0px' }
      }}
    >
      {STEPS.map(step => (
        <Box
          key={step.id}
          sx={{
            background: '#EEF5FF',
            borderRadius: '8px',
            pt: '15px',
            pb: { xs: '15px', md: '30px' },
            px: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            textAlign: 'center'
          }}
        >
          <Box
            component='img'
            src={step.icon}
            alt={step.title}
            sx={{ mb: '15px', width: '60px', height: '60px' }}
          />
          <Typography
            sx={{
              color: theme.palette.t3BodyText,
              mb: '15px',
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: '22px'
            }}
          >
            {step.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Lato',
              fontWeight: 400,
              fontSize: '18px',
              color: theme.palette.t3BodyText
            }}
          >
            {step.description}
          </Typography>
        </Box>
      ))}
    </Box>
    <Link href='/credentialForm' passHref>
      <Button
        variant='contained'
        sx={{
          backgroundColor: theme.palette.t3ButtonBlue,
          color: '#FFFFFF',
          fontFamily: 'Roboto',
          borderRadius: '100px',
          py: 1.5,
          px: 4,
          textTransform: 'none',
          fontSize: '16px',
          lineHeight: '20px',
          mx: 'auto',
          display: { xs: 'block', md: 'none' },
          mb: '30px',
          width: { xs: '100%', md: 'auto' },
          maxWidth: '360px',
          fontWeight: 500
        }}
      >
        Start building your first skill
      </Button>
    </Link>
  </Box>
)

const Page = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background:
          'url(/Background.png) lightgray 50% / contain no-repeat, rgba(255, 255, 255, 0.5)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <HeroSection showCards={!isMobile} theme={theme} />
      {isMobile && <MobileOpenCredsSection theme={theme} />}
      <StepsSection theme={theme} />
    </Box>
  )
}

export default Page
