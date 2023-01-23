import { FC } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MapIcon from '@mui/icons-material/Map'
import InfoIcon from '@mui/icons-material/Info'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, Outlet } from 'react-router-dom'

const drawerWidth = 200

const Main: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Travel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='permanent'
      >
        <Toolbar />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/'>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/map'>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary='Map' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/about'>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List sx={{ marginTop: 'auto' }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to='/sign-in'>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Log out' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

Main.displayName = 'Main'

export { Main }
