import React from 'react'
import { MenuItem, Menu, Button, Box } from '@mui/material'
import { HamburgerMenuSVG } from '../../Assets/SVGs'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const HamburgerMenu = () => {
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      {session ? (
        <Box>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <HamburgerMenuSVG />
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <Link href={'/claims'}>
              <MenuItem onClick={handleClose}>My Skills</MenuItem>
            </Link>
            <Link href={'/credentialForm'}>
              <MenuItem onClick={handleClose}>Add a Skill</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                handleClose
                signOut()
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      ) : (
        <Button
          sx={{
            padding: '10px 20px',
            borderRadius: '100px',
            textTransform: 'capitalize',
            fontFamily: 'Roboto',
            fontWeight: '600',
            lineHeight: '20px',
            border: '1px solid  #4E4E4E',
            backgroundColor: '#003FE0',
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#003FE0'
            }
          }}
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </>
  )
}

export default HamburgerMenu
