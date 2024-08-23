import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import BadgeIcon from '../../../../Assets/SVGs/Badge.svg'

const SuccessPage = () => {
  return (
    <Box
      sx={{
        width: '360px',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '0px 0px 146px',
        boxSizing: 'border-box',
        gap: '31.3px',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        fontSize: '13px',
        color: '#202e5b',
        fontFamily: 'Inter'
      }}
    >
      <Box
        sx={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '15px',
          textAlign: 'center',
          fontSize: '24px',
          color: '#202e5b',
          fontFamily: 'Lato'
        }}
      >
        <Typography sx={{ fontSize: '16px', letterSpacing: '0.01em', textAlign: 'left' }}>
          Now let Alice know that you’ve completed a recommendation for her.
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: 'stretch',
          borderRadius: '10px',
          backgroundColor: '#fff',
          border: '1px solid #003fe0',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '9px 12px',
          gap: '5px',
          maxWidth: '100%'
        }}
      >
        <Box
          sx={{
            height: '24px',
            width: '24px',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
            zIndex: 1
          }}
        >
          <Image src={BadgeIcon} alt='Badge' layout='fill' objectFit='contain' />
        </Box>
        <Typography sx={{ position: 'relative', letterSpacing: '0.06px', zIndex: 1 }}>
          Carol Taylor vouched for Alice Parker.
        </Typography>
      </Box>
      <Box
        sx={{
          alignSelf: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          maxWidth: '100%'
        }}
      >
        <Button
          variant='contained'
          sx={{
            width: '100%',
            backgroundColor: '#003FE0',
            borderRadius: '100px',
            textTransform: 'none',
            fontFamily: 'Roboto, sans-serif',
            boxShadow: '0px 0px 2px 2px #F7BC00',
            mt: 2
          }}
        >
          Some text...
        </Button>
      </Box>
    </Box>
  )
}

export default SuccessPage
