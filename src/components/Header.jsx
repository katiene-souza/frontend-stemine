import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';

import { colors } from '../constants/Colors';
import { menu_buttons } from '../constants/Messages';

import { useAuth } from '../contexts/AuthContext';
import { navItems } from '../utils/NavItems';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();
  const openMenu = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: colors.white, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        {/* Logo da STEMINE (Link) */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: colors.brand_colors.stemine_purple, fontWeight: 'bold' }}
        >
          STEMINE
        </Typography>

        <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center'
        }}>
          {/* Links de Navegação Principal */}
          {navItems.map((item) => (
            <Button
              key={item.text}
              component={Link} 
              to={item.path}
              sx={{
                color: colors.text.primary,
                textTransform: 'none', 
                marginRight: 2,
                padding: '6px 8px',
                minWidth: 'unset', 
                '&:hover': {
                  backgroundColor: 'transparent', 
                  color: colors.brand_colors.stemine_pink, 
                  textDecoration: 'none',
                }
              }}
            >
              {item.text}
            </Button>
          ))}

          {/* Seção de Perfil */}
          {isAuthenticated ? (
            <Box sx={{ marginLeft: 2, display: 'flex', alignItems: 'center' }}>
              <Button
                id="profile-menu-button"
                aria-controls={openMenu ? 'profile-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleMenuClick}
                sx={{ 
                  textTransform: 'none', 
                  color: colors.brand_colors.stemine_purple, 
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: colors.brand_colors.stemine_purple_light,
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: colors.brand_colors.stemine_pink,
                    color: colors.white,
                    width: 32, 
                    height: 32, 
                    marginRight: 1,
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </Avatar>
                {user?.name ? user.name.split(' ')[0] : 'Usuário'}
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'profile-menu-button',
                }}
                PaperProps={{
                  sx: {
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <MenuItem onClick={() => { handleMenuClose(); /* navigate('/profile'); */ }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" sx={{ color: colors.text.secondary }} />
                  </ListItemIcon>
                  <ListItemText primary="Meu Perfil" sx={{ color: colors.text.primary }} />
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: colors.status.error }} />
                  </ListItemIcon>
                  <ListItemText primary="Sair" sx={{ color: colors.status.error }} />
                </MenuItem>
              </Menu>
            </Box>
          ) : (

            <Button
              variant="contained" 
              component={Link}
              to="/login"
              sx={{
                backgroundColor: colors.brand_colors.stemine_pink,
                color: colors.white,
                textTransform: 'none',
                padding: '8px 16px',
                fontWeight: 'bold',
                marginLeft: 1,
                '&:hover': {
                  backgroundColor: colors.brand_colors.stemine_pink_dark,
                },
              }}
            >
              {menu_buttons.quick_links.to_enter}
            </Button>
          )}
        </Box>

        {/* Menu Hamburguer */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{
            color: colors.brand_colors.stemine_purple,
            display: { xs: 'flex', md: 'none' }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* (Menu Lateral) */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }, display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon sx={{ color: colors.text.primary }} />
          </IconButton>
        </Box>
        <List>
          {/* Navegação principal no Drawer */}
          {navItems.map((item) => (
            <ListItem 
              key={item.text} 
              component={Link} 
              to={item.path} 
              onClick={handleDrawerToggle}
              sx={{ 
                color: colors.text.primary, 
                textTransform: 'none', 
                '&:hover': { backgroundColor: colors.background.light, textDecoration: 'none' } 
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {/* Itens de Autenticação/Perfil no Drawer */}
          {isAuthenticated ? (
            <>
              <Divider sx={{ my: 0.5 }} />
              <ListItem 
                component={Link} 
                to="/profile" 
                onClick={handleDrawerToggle}
                sx={{ 
                  color: colors.text.primary, 
                  textTransform: 'none', 
                  '&:hover': { backgroundColor: colors.background.light, textDecoration: 'none' } 
                }}
              >
                <ListItemIcon> <PersonIcon fontSize="small" sx={{ color: colors.text.secondary }} /> </ListItemIcon>
                <ListItemText primary="Meu Perfil" />
              </ListItem>
              <ListItem 
                onClick={() => { handleLogout(); handleDrawerToggle(); }}
                sx={{ 
                  color: colors.status.error, 
                  textTransform: 'none', 
                  '&:hover': { backgroundColor: colors.background.light } 
                }}
              >
                <ListItemIcon> <LogoutIcon fontSize="small" sx={{ color: colors.status.error }} /> </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItem>
            </>
          ) : (
            <>
              <Divider sx={{ my: 0.5 }} />
              <ListItem 
                component={Link} 
                to="/login" 
                onClick={handleDrawerToggle}
                sx={{ color: colors.text.primary, textTransform: 'none', '&:hover': { backgroundColor: colors.background.light } }}
              >
                <ListItemText primary={menu_buttons.quick_links.to_enter} />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;