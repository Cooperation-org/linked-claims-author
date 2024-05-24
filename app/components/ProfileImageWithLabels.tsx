'use client'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import profileImage from '../Assets/Tessa.png'
import styled from '@emotion/styled'

const ProfileContainer = styled(Box)`
  position: relative;
  width: 100vw;
  margin: auto;
  gap: 37px;
  overflow-hidden
`

const Label = styled(Box)`
  position: absolute;
  background-color: #ffcb25;
  border-radius: 4px;
  padding: 2px 5px;
  text-align: center;
`
const SvgContainer = styled(Box)`
  width: 100vw;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100px;
  }
`

const ProfileImageWithLabels = () => {
  const theme = useTheme()

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <ProfileContainer>
      <SvgContainer>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 33' fill='none'>
          <path
            d='M0.0756446 3.49914C7.11886 4.7249 82.6781 7.3487 96.7554 7.88507C213.731 12.3421 349.779 17.3509 466.184 19.3624C534.993 20.5514 596.649 20.6103 655.577 20.6927C745.689 20.8188 831.768 20.5617 923.992 20.8853C1019.01 21.2186 1118.52 22.1691 1228.31 24.4183C1298.75 25.8614 1368.37 27.8896 1439.94 29.9001'
            stroke='#FFCB25'
            strokeWidth='6'
            strokeLinecap='round'
          />
        </svg>
      </SvgContainer>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isSmallScreen ? '110px' : '192px',
          textAlign: 'center'
        }}
      >
        <Box>
          <Image
            priority
            src={profileImage}
            alt='Profile Image'
            style={{
              width: isSmallScreen ? '110px' : '192px',
              height: 'auto',
              border: '4px solid #003FE0',
              borderRadius: '50%'
            }}
          />
        </Box>
        <Label
          sx={{
            top: isSmallScreen ? 'calc(50% - 45px)' : 'calc(50% - 75px)',
            left: isSmallScreen ? 'calc(50% + 52px)' : 'calc(50% + 70px)',
            width: isSmallScreen ? '44px' : '54px',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography
            variant='caption'
            sx={{
              fontFamily: 'Lato',
              fontWeight: '400',
              fontSize: isSmallScreen ? '14px' : '18px'
            }}
          >
            Hired
          </Typography>
        </Label>
        <Label
          sx={{
            top: '50%',
            left: isSmallScreen ? 'calc(50% - 75px)' : 'calc(50% - 123px)',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography
            variant='caption'
            sx={{
              fontFamily: 'Lato',
              fontWeight: '400',
              fontSize: isSmallScreen ? '14px' : '18px'
            }}
          >
            Admitted
          </Typography>
        </Label>
        <Label
          sx={{
            top: isSmallScreen ? 'calc(50% + 17px)' : 'calc(50% + 38px)',
            left: isSmallScreen ? 'calc(50% + 69px)' : 'calc(50% + 98px)',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Typography
            variant='caption'
            sx={{
              fontFamily: 'Lato',
              fontWeight: '400',
              fontSize: isSmallScreen ? '14px' : '18px'
            }}
          >
            Promoted
          </Typography>
        </Label>
      </Box>
    </ProfileContainer>
  )
}

export default ProfileImageWithLabels
