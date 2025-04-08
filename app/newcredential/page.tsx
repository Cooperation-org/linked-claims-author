'use client'
import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, Button, Tooltip, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import {
  BriefcaseIcon,
  VolunteerOrganizationIcon,
  ClipboardIcon,
  TeamSkillIcon
} from '../Assets/SVGs'
import IdCardsIconsImg from '../Assets/SVGs/IDs2.svg'

type CredentialType =
  | 'employment'
  | 'volunteering'
  | 'performanceReview'
  | 'skill'
  | 'identityVerification'
  | null

interface CredentialOption {
  type: CredentialType
  title: string
  icon: React.ReactNode
  description: string
  secondaryLabel?: string
}

const CredentialCard = ({
  title,
  icon,
  description,
  secondaryLabel,
  isSelected,
  isDisabled,
  onClick
}: {
  title: string
  icon: React.ReactNode
  description: string
  secondaryLabel?: string
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const cardContent = (
    <Box
      onClick={isDisabled ? undefined : onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'nowrap',
        flexShrink: 0,
        gap: '12px',
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: '440px',
        padding: '30px 20px',
        background: '#ffffff',
        border: isSelected ? '2px solid #2563eb' : '1px solid #2563EB',
        borderRadius: '8px',
        mb: isMobile ? 2 : 0,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s, border 0.1s',
        opacity: isDisabled ? 0.6 : 1,
        '&:hover': {
          transform: isDisabled ? 'none' : 'translateY(-3px)',
          boxShadow: isDisabled ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)'
        }
      }}
    >
      <Typography
        sx={{
          alignSelf: 'stretch',
          position: 'relative',
          color: '#1F2937',
          fontFamily: 'Poppins, sans-serif',
          fontSize: { xs: '18px', md: '20px' },
          fontWeight: 600,
          textAlign: 'center',
          mb: 2
        }}
      >
        {title}
      </Typography>
      <Box sx={{ mb: '12px' }}>{icon}</Box>
      <Typography
        sx={{
          color: '#2E2E48',
          fontFamily: 'Nunito Sans',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '-0.16px',
          lineHeight: '24px',
          textAlign: 'center'
        }}
      >
        {description}
      </Typography>
      {secondaryLabel && (
        <Typography
          sx={{
            color: '#9CA3AF',
            fontFamily: 'Nunito Sans',
            fontSize: '12px',
            fontWeight: 400,
            textAlign: 'center'
          }}
        >
          {secondaryLabel}
        </Typography>
      )}

      {isDisabled && (
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: '#F43F5E',
            color: 'white',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}
        >
          Coming Soon
        </Box>
      )}
    </Box>
  )

  if (isDisabled) {
    return (
      <Tooltip title='Under development </>' arrow placement='top'>
        {cardContent}
      </Tooltip>
    )
  }

  return cardContent
}

export default function NewCredentialPage() {
  const [disabledCredentials] = useState<CredentialType[]>([
    'employment',
    'volunteering',
    'performanceReview',
    'identityVerification'
  ])

  const [selectedCredential, setSelectedCredential] = useState<CredentialType>(null)
  const router = useRouter()
  const isXsOnly = useMediaQuery('(max-width:599px)')
  const isSmToMd = useMediaQuery('(min-width:600px) and (max-width:959px)')
  const isLgUp = useMediaQuery('(min-width:960px)')

  const handleSelectCredential = (credentialType: CredentialType) => {
    if (disabledCredentials.includes(credentialType)) return
    setSelectedCredential(credentialType)
  }

  const handleContinue = () => {
    if (!selectedCredential) return

    const routes = {
      employment: '/employmentform',
      volunteering: '/volunteeringform',
      performanceReview: '/performanceReviewform',
      skill: '/skillform',
      identityVerification: '/identityVerificationform'
    }

    router.push(routes[selectedCredential])
  }

  const credentialOptions: CredentialOption[] = [
    {
      type: 'employment',
      title: 'Employment',
      icon: <BriefcaseIcon />,
      description: 'Claim employment'
    },
    {
      type: 'volunteering',
      title: 'Volunteering',
      icon: <VolunteerOrganizationIcon />,
      description: 'Supported file types'
    },
    {
      type: 'performanceReview',
      title: 'Performance Review',
      icon: <ClipboardIcon />,
      description: 'Document a performance review'
    },
    {
      type: 'skill',
      title: 'Skill',
      icon: <TeamSkillIcon />,
      description: 'Document a skill'
    },
    {
      type: 'identityVerification',
      title: 'Identity Verification',
      icon: (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            component='img'
            src={IdCardsIconsImg.src}
            alt='Identity verification'
            sx={{
              width: 'auto',
              height: '80px'
            }}
          />
        </Box>
      ),
      description: 'Verify your government issued ID'
    }
  ]

  const renderMobileLayout = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}>
        {credentialOptions.map(option => (
          <Box key={option.type} sx={{ width: '100%', maxWidth: '440px', mx: 'auto' }}>
            <CredentialCard
              title={option.title}
              icon={option.icon}
              description={option.description}
              secondaryLabel={option.secondaryLabel}
              isSelected={selectedCredential === option.type}
              isDisabled={disabledCredentials.includes(option.type)}
              onClick={() => handleSelectCredential(option.type)}
            />
          </Box>
        ))}
      </Box>
    )
  }

  const renderTabletLayout = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
          {credentialOptions.slice(0, 4).map(option => (
            <Box
              key={option.type}
              sx={{ width: '100%', maxWidth: '440px', justifySelf: 'center' }}
            >
              <CredentialCard
                title={option.title}
                icon={option.icon}
                description={option.description}
                secondaryLabel={option.secondaryLabel}
                isSelected={selectedCredential === option.type}
                isDisabled={disabledCredentials.includes(option.type)}
                onClick={() => handleSelectCredential(option.type)}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '440px' }}>
            <CredentialCard
              title={credentialOptions[4].title}
              icon={credentialOptions[4].icon}
              description={credentialOptions[4].description}
              secondaryLabel={credentialOptions[4].secondaryLabel}
              isSelected={selectedCredential === credentialOptions[4].type}
              isDisabled={disabledCredentials.includes(credentialOptions[4].type)}
              onClick={() => handleSelectCredential(credentialOptions[4].type)}
            />
          </Box>
        </Box>
      </Box>
    )
  }

  const renderDesktopLayout = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {credentialOptions.slice(0, 3).map(option => (
            <Box
              key={option.type}
              sx={{
                width: '100%',
                maxWidth: '440px',
                justifySelf: 'center'
              }}
            >
              <CredentialCard
                title={option.title}
                icon={option.icon}
                description={option.description}
                secondaryLabel={option.secondaryLabel}
                isSelected={selectedCredential === option.type}
                isDisabled={disabledCredentials.includes(option.type)}
                onClick={() => handleSelectCredential(option.type)}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          {credentialOptions.slice(3, 5).map(option => (
            <Box
              key={option.type}
              sx={{
                width: '100%',
                maxWidth: '440px'
              }}
            >
              <CredentialCard
                title={option.title}
                icon={option.icon}
                description={option.description}
                secondaryLabel={option.secondaryLabel}
                isSelected={selectedCredential === option.type}
                isDisabled={disabledCredentials.includes(option.type)}
                onClick={() => handleSelectCredential(option.type)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        pt: { xs: '43px', md: '75px' },
        px: { xs: '20px', md: '0px' },
        position: 'relative',
        minHeight: 'calc(100vh - 315px)'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          mb: { xs: 4, md: 6 }
        }}
      >
        <Typography
          sx={{
            color: '#1F2937',
            fontFamily: 'Lato',
            fontSize: { xs: '18px', md: '24px' },
            fontWeight: 700,
            textAlign: 'center',
            mb: 1
          }}
        >
          Step 1
        </Typography>
        <Typography
          sx={{
            color: '#4B5563',
            fontFamily: 'Lato',
            fontSize: { xs: '16px', md: '24px' },
            fontWeight: 500,
            textAlign: 'center'
          }}
        >
          What type of credential do you want to create?
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          mt: { xs: 4, md: '15vh' },
          mb: { xs: 4, md: '15vh' }
        }}
      >
        {isXsOnly && renderMobileLayout()}
        {isSmToMd && renderTabletLayout()}
        {isLgUp && renderDesktopLayout()}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100vw',
          mt: 'auto',
          mb: '-76px',
          padding: '20px',
          borderTop: '1px solid #E5E7EB',
          backgroundColor: '#fff',
          boxShadow: '4px -4px 10px 2px rgba(20, 86, 255, 0.25)',
          position: 'relative'
        }}
      >
        <Button
          variant='contained'
          disabled={!selectedCredential}
          onClick={handleContinue}
          sx={{
            backgroundColor: '#003FE0',
            borderRadius: '50px',
            padding: '8px 24px',
            textTransform: 'none',
            height: { xs: '40px', md: '66px' },
            width: { xs: '100%', md: '136px' },
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#003FE0'
            },
            '&.Mui-disabled': {
              backgroundColor: '#B5B5B5',
              color: '#2E2E48'
            },
            fontFamily: 'Nunito Sans',
            fontSize: '18px'
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  )
}
