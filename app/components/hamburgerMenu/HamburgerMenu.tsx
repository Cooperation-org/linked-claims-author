import React from 'react'
import { Box, Typography, Button, Drawer, IconButton } from '@mui/material'
import { SVGCheckMarks, HamburgerMenuSVG, CloseIcon } from '../../Assets/SVGs'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '../../Assets/SVGs/index'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const features = [
  { id: 1, name: 'Capture any skill or experience' },
  { id: 2, name: 'Add portfolio pieces and evidence' },
  { id: 3, name: 'Request references from others' },
  { id: 4, name: 'Share with employers & on LinkedIn' }
]

const HamburgerMenu = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const toggleDrawer = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path: string) => pathname === path

  return (
    <>
      <IconButton onClick={toggleDrawer} aria-label='Open menu'>
        <HamburgerMenuSVG />
      </IconButton>
      <Drawer anchor='left' open={isOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: '300px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Link href='/'>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Logo />
                <Typography
                  sx={{
                    ml: '8px',
                    fontWeight: 700,
                    fontSize: '24px',
                    color: '#000'
                  }}
                >
                  OpenCreds
                </Typography>
              </Box>
            </Link>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content based on session state */}
          <Box sx={{ mt: 3, width: '100%' }}>
            {session ? (
              <>
                {/* Links with underline effect */}
                <Link href='/claims' passHref>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: isActive('/claims') ? '600' : '400',
                        color: isActive('/claims') ? '#003FE0' : 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      My Skills
                    </Typography>
                    {isActive('/claims') && (
                      <Box
                        sx={{
                          height: '2px',
                          width: '100%',
                          mt: '5px',
                          backgroundColor: '#003FE0'
                        }}
                      />
                    )}
                  </Box>
                </Link>
                <Link href='/credentialForm' passHref>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '16px',
                        fontWeight: isActive('/credentialForm') ? '600' : '400',
                        color: isActive('/credentialForm') ? '#003FE0' : 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      Add a Skill
                    </Typography>
                    {isActive('/credentialForm') && (
                      <Box
                        sx={{
                          height: '2px',
                          width: '100%',
                          mt: '5px',
                          backgroundColor: '#003FE0'
                        }}
                      />
                    )}
                  </Box>
                </Link>
              </>
            ) : (
              <>
                {/* Login description and features */}
                <Typography variant='h6' sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
                  Login to access your OpenCreds
                </Typography>
                <Typography sx={{ mb: 2 }}>With OpenCreds, you can:</Typography>
                {features.map(feature => (
                  <Box
                    key={feature.id}
                    sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                  >
                    <SVGCheckMarks />
                    <Typography sx={{ ml: 1, fontSize: '16px' }}>
                      {feature.name}
                    </Typography>
                  </Box>
                ))}

                {/* Login Button */}
                <Button
                  sx={{
                    width: '100%',
                    borderRadius: '100px',
                    textTransform: 'capitalize',
                    backgroundColor: '#003FE0',
                    color: '#FFF',
                    mt: 4,
                    '&:hover': {
                      backgroundColor: '#003FE0'
                    }
                  }}
                  onClick={() => {
                    signIn()
                    toggleDrawer()
                  }}
                >
                  Sign up or Login
                </Button>
              </>
            )}
          </Box>

          {/* About and Support Links */}
          {/* Uncomment these if needed */}
          {/* <Box sx={{ width: '100%' }}>
            <Link href='/about' passHref>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  mt: 2
                }}
              >
                <Typography>About OpenCreds</Typography>
                <ArrowForwardIosIcon fontSize='small' />
              </Box>
            </Link>
            <Link href='/support' passHref>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  mt: 2
                }}
              >
                <Typography>Support</Typography>
                <ArrowForwardIosIcon fontSize='small' />
              </Box>
            </Link>
          </Box> */}

          {/* Logout Button */}
          {session && (
            <Button
              sx={{
                width: '100%',
                borderRadius: '100px',
                textTransform: 'capitalize',
                backgroundColor: '#003FE0',
                color: '#FFF',
                mt: 2,
                '&:hover': {
                  backgroundColor: '#003FE0'
                }
              }}
              onClick={() => {
                signOut()
                toggleDrawer()
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  )
}

export default HamburgerMenu
