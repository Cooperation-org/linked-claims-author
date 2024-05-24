'use client'
import React from 'react'
import { Box, Typography, useTheme, useMediaQuery, Avatar, Button } from '@mui/material'
import ProfileImageWithLabels from './components/ProfileImageWithLabels'
import SVGDesign, { SVGCheckMarks } from './Assets/SVGs'
import Image from 'next/image'
import AddIcon from './Assets/Add_icon.png'
import TwoPhonesM from './Assets/TwoPhonesMobile.svg'
import TwoPhonesT from './Assets/TwoPhonesTablet.svg'
import TwoPhonesD from './Assets/TwoPhonesDesktop.svg'
import {
  testimonials,
  featuresSmallScreen,
  featuresLargeScreen
} from './components/landingPageVariables'
import Link from 'next/link'

const Page = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  const features = isSmallScreen ? featuresSmallScreen : featuresLargeScreen

  let selectedImage
  if (isSmallScreen) {
    selectedImage = TwoPhonesM
  } else if (isMediumScreen) {
    selectedImage = TwoPhonesT
  } else if (isLargeScreen) {
    selectedImage = TwoPhonesD
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '37px',
        alignItems: 'center'
      }}
    >
      {/* Header Component */}
      <Box
        sx={{
          display: 'flex',
          height: { xs: '360px', md: '441px' },
          flexDirection: 'column',
          gap: '37px',
          alignItems: 'center',
          textAlign: 'center',
          mt: { xs: '37px', md: '148px' },
          position: 'relative'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '37px', md: '30px' },
            position: 'relative'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: { xs: '92.308vw', md: '712px' },
              maxWidth: { xs: '360px', md: '712px' },
              height: { xs: '60px', md: '154px' }
            }}
          >
            <Typography
              sx={{
                color: '#242f56',
                fontFamily: 'Poppins',
                fontSize: { xs: '30px', md: '70px' },
                fontWeight: 600,
                lineHeight: '110%',
                textAlign: 'center',
                mb: { xs: '15px', md: '30px' }
              }}
            >
              Verified Skills For Your Resume
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '325px',
              height: '44px'
            }}
          >
            <Typography
              sx={{
                color: '#242f56',
                fontFamily: 'Lato',
                fontSize: { xs: '16px', md: '18px' },
                fontWeight: 400,
                lineHeight: 'normal',
                textAlign: 'center'
              }}
            >
              Sign up in seconds. Let your true skills shine. Stand out from the crowd.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: { xs: '37px', md: '45px' }
          }}
        >
          <ProfileImageWithLabels />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: { xs: '37px', md: '26px' }
          }}
        >
          <Link href='/CredentialForm'>
            <Button
              sx={{
                width: '176px',
                height: '40px',
                fontFamily: 'Lato',
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px',
                borderRadius: '100px',
                backgroundColor: '#003fe0',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textTransform: 'lowercase',
                border: 'none',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#003fe080'
                }
              }}
            >
              Get started for FREE
            </Button>
          </Link>
        </Box>
      </Box>

      {/*Building Section Component */}
      <Box
        sx={{
          display: 'inline-flex',
          height: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          flexShrink: 0,
          textAlign: 'center',
          position: 'relative',
          width: { xs: '360px', md: '437px' },
          marginTop: { xs: '90px', md: '90px' }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            zIndex: 3,
            left: { xs: 'calc(50% - 189px)', md: 'calc(50% - 193px)' },
            top: { xs: 'calc(50% - 98px)', md: 'calc(50% - 108px)' }
          }}
        >
          <SVGDesign />
        </Box>
        <Typography
          sx={{
            color: '#242f56',
            fontFamily: 'Poppins',
            fontWeight: 600,
            lineHeight: '125%',
            fontSize: { xs: '20px', md: '24px' },
            padding: { xs: '0 20px', md: '0 50px' }
          }}
        >
          Building your story in the age of AI.
        </Typography>
        <Typography
          sx={{
            color: '#202e5b',
            fontFamily: 'Lato',
            fontWeight: 400,
            lineHeight: 'normal',
            fontSize: { xs: '16px', md: '18px' },
            padding: { xs: '0 10px', md: '0 30px' }
          }}
        >
          No more cut and paste. No more re-doing your resume. Add your skills once, then
          mix and match them for each job.
        </Typography>
      </Box>

      {/* Two Phones Section Component */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '321px', md: 'auto' },
          maxWidth: '898.22px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: { xs: '20px', md: '40px' },
          gap: { xs: '33px', md: '60px' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '2px',
            maxWidth: { xs: '318px', md: '515px' }
          }}
        >
          <Image src={selectedImage} alt='two phones' />
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            alignItems: 'center',
            width: '321px',
            textAlign: 'start'
          }}
        >
          {features.map(feature => (
            <Box
              key={feature.id}
              sx={{ display: 'flex', gap: '15px', width: '100%', maxWidth: '321px' }}
            >
              <SVGCheckMarks />
              <Typography
                sx={{
                  color: '#202E5B',
                  flexShrink: 0,
                  fontFamily: 'Lato',
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: 'normal'
                }}
              >
                {feature.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Testimonial Component */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#F6F6F6',
          textAlign: 'left'
        }}
      >
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#F6F6F6',
            textAlign: 'center',
            mb: { xs: '0px', md: '55px' }
          }}
        >
          <Typography
            sx={{
              lineHeight: '125%',
              fontWeight: 600,
              mt: { xs: '53px', md: '40px' },
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              textAlign: 'center',
              mx: 'auto',
              fontSize: { xs: '24px', md: '36px' }
            }}
          >
            Your data. Your stories.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            gap: '30px',
            overflowX: 'auto',
            paddingLeft: '40px',
            paddingTop: { xs: '33px', md: '44px' },
            paddingBottom: { xs: '38px', md: '44px' },
            '&::-webkit-scrollbar': {
              height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#FFCB25',
              borderRadius: '10px'
            }
          }}
        >
          {testimonials.map(testimonial => (
            <Box
              key={testimonial.id}
              sx={{
                flex: '0 0 auto',
                width: '328px',
                height: '192px',
                backgroundColor: '#FFCB25',
                borderRadius: '10px',
                opacity: 0.9,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '25px 17px',
                gap: '16px',
                position: 'relative',
                mb: { xs: '0px', md: '54px' }
              }}
            >
              {testimonial.id === 1 && (
                <Image
                  priority
                  src={AddIcon.src}
                  width={40}
                  height={40}
                  alt='Add Icon'
                  style={{
                    width: '40px',
                    display: 'block',
                    position: 'absolute',
                    top: '-30px',
                    left: 'calc(50% - 194px)'
                  }}
                />
              )}
              <Avatar
                alt={testimonial.name}
                src={testimonial.image.src}
                sx={{ width: 57, height: 57, mb: '100px' }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '9px'
                }}
              >
                <Typography
                  sx={{
                    width: '212px',
                    color: '#202E5B',
                    fontFamily: 'Lato',
                    fontSize: '13px',
                    fontWeight: '700',
                    lineHeight: 'normal',
                    mb: '15px'
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  sx={{
                    width: '212px',
                    color: '#202E5B',
                    fontFamily: 'Lato',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: 'normal'
                  }}
                >
                  {testimonial.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Page
