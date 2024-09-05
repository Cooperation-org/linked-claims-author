import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Box, Typography } from '@mui/material'
import { InstagramSVG, TwitterSVG, LinkedinSVG } from '../../Assets/SVGs'

const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '129px', md: '295px' },
        minHeight: { xs: '129px', md: '129px' },
        bgcolor: theme.palette.t3BodyText,
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
          ml: { xs: '22px', md: '52px' },
          mt: { xs: '29px', md: 'auto' },
          mb: { xs: '24px', md: '24px' }
        }}
      >
        <Box sx={{ display: 'flex', gap: '9px' }}>
          <Box
            sx={{
              bgcolor: theme.palette.t3LightGray,
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TwitterSVG />
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.t3LightGray,
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <LinkedinSVG />
          </Box>
          <Box
            sx={{
              bgcolor: theme.palette.t3LightGray,
              borderRadius: '20px',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <InstagramSVG />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '28px' }}>
          <Typography
            sx={{
              color: theme.palette.t3LightGray,
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
              color: theme.palette.t3LightGray,
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
