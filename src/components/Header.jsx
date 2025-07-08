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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { colors } from '../constants/Colors';
import { menu_buttons } from '../constants/Messages';
import { navItems } from '../utils/NavItems';


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const authItems = [
    { text: menu_buttons.quick_links.to_enter, path: '/login' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: colors.white, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
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
          {navItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{ 
                color: colors.text.primary, 
                textTransform: 'none', 
                marginRight: 2,
                '&:hover': {
                  color: colors.brand_colors.stemine_pink,
                  backgroundColor: 'transparent',
                }
              }}
            >
              {item.text}
            </Button>
          ))}
          {authItems.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.path}
              variant="contained"
              sx={{ 
                backgroundColor: colors.brand_colors.stemine_pink, 
                color: colors.white, 
                textTransform: 'none',
                borderRadius: '50px',
                padding: "4px 20px",
                marginLeft: 1,
                '&:hover': {
                  backgroundColor: colors.brand_colors.stemine_pink_dark,
                }
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

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

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          display: { xs: 'block', md: 'none' } 
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon sx={{ color: colors.text.primary }} />
          </IconButton>
        </Box>
        <List>
          {navItems.concat(authItems).map((item) => (
            <ListItem 
              key={item.text} 
              component={Link} 
              to={item.path} 
              onClick={handleDrawerToggle}
              sx={{ 
                color: colors.text.primary, 
                textDecoration: 'none', 
                '&:hover': { backgroundColor: colors.background.light } 
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;