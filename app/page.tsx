// page.tsx
'use client'
import React from 'react'
import { Box, Button, Typography, useTheme, useMediaQuery, Theme } from '@mui/material'
import Link from 'next/link'
import Card from './components/cards'

interface SectionProps {
  theme: Theme
}

const EXAMPLE_CARDS = [
  {
    id: 'barista',
    title: 'Example',
    description:
      'I am able to demonstrate advanced skills in coffee preparation, customer service, and knowledge of coffee origins and brewing techniques.',
    criteria: [
      'Took 12 hours of barista classes',
      'Received positive customer surveys',
      'Received positive teacher feedback'
    ],
    duration: '2 Days',
    evidence: [
      'Video of the Perfect Pour',
      'Coffee Portfolio',
      'Training Campus Certification',
      'Scent training',
      'IMG_0624',
      'Tamping',
      'IMG_0640'
    ],
    width: '185px',
    height: '410px',
    rotation: 'rotate(-5deg)',
    image: '/coffee.jpeg',
    showPlayButton: true,
    showTimer: true
  },
  {
    id: 'chef',
    title: 'Example',
    description:
      'I am able to prepare authentic Italian pasta dishes, showcasing expertise in traditional techniques, ingredient selection, and plating for fine dining experiences.',
    criteria: [
      'Completed 10 hours of Italian culinary classes',
      'Successfully presented pasta dishes in a practical exam',
      'Received feedback from a certified Italian chef'
    ],
    duration: '3 Days',
    evidence: [
      'Recipe Portfolio',
      'Culinary Exam Certification',
      'IMG_2022',
      'Handmade Pasta Techniques',
      'Pasta Plating Video'
    ],
    width: '200px',
    height: '430px',
    rotation: 'rotate(0deg)',
    image: '/pasta-example.jpg',
    showPlayButton: true,
    showTimer: true
  },
  {
    id: 'developer',
    title: 'Example',
    description:
      'I am able to demonstrate advanced skills in web development, including front-end design, back-end functionality, and deploying responsive, user-friendly websites.',
    criteria: [
      'Built and deployed three fully functional websites for clients',
      'Completed a 15-hour advanced web development bootcamp',
      'Received testimonials from clients for delivering high-quality work on time'
    ],
    duration: '1 Month',
    evidence: [
      'Portfolio of Completed Websites',
      'Bootcamp Certification',
      'Client Testimonials',
      'Code Repository (GitHub/Bitbucket)'
    ],
    width: '185px',
    height: '410px',
    rotation: 'rotate(5deg)',
    image: '/dev.jpg',
    showPlayButton: false,
    showTimer: false
  }
]

const STEPS = [
  {
    id: 'capture',
    title: 'Capture your skills',
    icon: '/Document.svg',
    description:
      'Add your experiences, from school activities, caregiving, volunteering, to special projects and more.'
  },
  {
    id: 'validate',
    title: 'Add validation',
    icon: '/Human Insurance.svg',
    description:
      'Upload proof of your skills and request recommendations from trusted connections.'
  },
  {
    id: 'share',
    title: 'Share',
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
        maxWidth: '1224px',
        px: { xs: 2, md: 4 },
        py: 4
        // position: 'relative',
        // '&::before': {
        //   content: '""',
        //   position: 'absolute',
        //   top: 0,
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   backgroundImage: isMobile ? 'url(/Background.png)' : 'none',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        //   opacity: 0.2,
        //   zIndex: 0
        // },
        // '& > *': {
        //   position: 'relative',
        //   zIndex: 1
        // }
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', md: '60%' },
          textAlign: { xs: 'center', md: 'left' },
          alignSelf: { xs: 'center', md: 'flex-end' },
          pr: { xs: 0, md: 4 },
          height: { xs: 'auto', md: '432px' },
          mt: { xs: '43px', md: 0 }
        }}
      >
        <Typography
          variant='h2'
          sx={{
            color: theme.palette.t3Black,
            mb: '10px',
            fontFamily: 'poppins',
            fontSize: { xs: '30px', md: '50px' },
            fontWeight: 'bolder'
          }}
        >
          Showcase the skills that define you.
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: theme.palette.t3BodyText,
            mb: '30px',
            fontSize: { xs: '16px', md: '18px' }
          }}
        >
          Whether it's caring for your family, volunteering, a side hustle, or on-the-job
          learning, OpenCreds helps you document, verify, and share your unique
          experiences.
        </Typography>
        <Link href='/credentialForm' passHref>
          <Button
            variant='contained'
            sx={{
              backgroundColor: theme.palette.t3ButtonBlue,
              color: '#FFFFFF',
              borderRadius: '100px',
              py: 1.5,
              px: 4,
              textTransform: 'none',
              fontSize: '16px'
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
            alignItems: 'center',
            gap: 0,
            maxWidth: '565px',
            maxHeight: '467px',
            mt: 4
          }}
        >
          {EXAMPLE_CARDS.map(card => (
            <Card key={card.id} {...card} />
          ))}
        </Box>
      )}
    </Box>
  )
}

const MobileOpenCredsSection: React.FC<SectionProps> = ({ theme }) => (
  <Box
    sx={{
      background: 'linear-gradient(180deg, #F1F5FC, #FFFFFF)',
      py: 5,
      px: { xs: 2, md: 8 }
    }}
  >
    <Typography
      variant='h4'
      sx={{
        color: theme.palette.t3Black,
        textAlign: 'center',
        mb: 4
      }}
    >
      What are OpenCreds?
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant='body1'
          sx={{
            color: theme.palette.t3BodyText,
            mb: 2
          }}
        >
          OpenCreds are verifiable skills that you create to showcase your experiences.
        </Typography>
        <Box
          component='ul'
          sx={{
            color: theme.palette.t3BodyText,
            pl: 2,
            mb: 0
          }}
        >
          {OPENCREDS_FEATURES.map(feature => (
            <Typography key={feature.id} component='li' variant='body2'>
              {feature.text}
            </Typography>
          ))}
        </Box>
      </Box>

      <Card
        {...EXAMPLE_CARDS[0]}
        width='180px'
        height='400px'
        rotation='rotate(0deg)'
        showPlayButton={true}
        showTimer={true}
        showDuration={true}
      />
    </Box>
  </Box>
)

const StepsSection: React.FC<SectionProps> = ({ theme }) => (
  <Box sx={{ maxWidth: '1224px', px: { xs: 0, md: 8 }, mr: 'auto', ml: 'auto' }}>
    <Box
      sx={{
        display: 'flex',
        width: { xs: 'auto', md: '360px' },
        height: '39px',
        mr: 'auto',
        ml: 'auto',
        mt: '28px',
        mb: '30px',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          color: theme.palette.t3Black,
          mb: 4,
          fontSize: { xs: '22px', md: '26px' },
          fontFamily: 'Poppins',
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: '125%'
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
        mb: 6
      }}
    >
      {STEPS.map(step => (
        <Box
          key={step.id}
          sx={{
            background: '#EEF5FF',
            borderRadius: '8px',
            p: 3,
            flex: 1,
            textAlign: 'center'
          }}
        >
          <Box
            component='img'
            src={step.icon}
            alt={step.title}
            sx={{ mb: 2, width: '60px', height: '60px' }}
          />
          <Typography variant='h6' sx={{ color: theme.palette.t3BodyText, mb: 2 }}>
            {step.title}
          </Typography>
          <Typography variant='body2' sx={{ color: theme.palette.t3BodyText }}>
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
          borderRadius: '100px',
          py: 1.5,
          px: 4,
          textTransform: 'none',
          fontSize: '16px',
          mr: 'auto',
          ml: 'auto',
          display: { xs: 'block', md: 'none' },
          mb: '90px'
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

        // background: isMobile
        //   ? '#FFFFFF'
        //   : 'url(/Background.png) lightgray 50% / contain no-repeat, rgba(255, 255, 255, 0.5)',
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
