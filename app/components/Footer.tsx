import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import LinkedinImage from '../Assets/linkedin.svg'
import TwitterImage from '../Assets/twitter.svg'
import InstagramImage from '../Assets/instagram.svg'
const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '129px', md: '295px' },
        bgcolor: '#202E5B',
        p: '25px',
        display: 'flex',
        alignItems: 'flex-end',
        alignContent: 'flex-end'
      }}
    >
      <Box
        sx={{
          width: '347px',
          height: '76px',
          display: 'flex',
          alignItems: 'flex-end',
          alignContent: 'flex-end',
          gap: '19px',
          flexWrap: 'wrap',
          ml: { xs: '0px', md: '52px' },
          mb: { xs: '0px', md: '24px' }
        }}
      >
        <Box sx={{ display: 'flex', gap: '9px' }}>
          <Box
            sx={{
              bgcolor: '#E5E7EB',
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image src={TwitterImage} alt='TwitterImage' />
          </Box>
          <Box
            sx={{
              bgcolor: '#E5E7EB',
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image src={LinkedinImage} alt='LinkedinImage' />
          </Box>
          <Box
            sx={{
              bgcolor: '#E5E7EB',
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image src={InstagramImage} alt='InstagramImage' />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '28px' }}>
          <Typography
            sx={{
              color: '#E5E7EB',
              fontFamily: 'Lato',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.14px'
            }}
          >
            Copyright, LinkedClaims, 2024
          </Typography>
          <Typography
            sx={{
              color: 'var(--T3-Lt-Gray, #E5E7EB)',
              fontFamily: 'Lato',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '-0.14px',
              textDecorationLine: 'underline'
            }}
          >
            Data <span>&</span> Privacy Policy
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
