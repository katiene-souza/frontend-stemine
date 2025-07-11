import React, { useState } from "react";
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
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";

import { COLORS_APP } from "../constants/Colors";
import { APP_NAVIGATION_CONTENT } from "../constants/Messages";

import { useAuth } from "../contexts/AuthContext";
import { nav_items } from "../utils/NavItems";

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

  console.log(user);

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: COLORS_APP.white,
        boxShadow: COLORS_APP.background.box_shadow_thick,
      }}
    >
      <Toolbar>
        {/* Logo da STEMINE (Link) */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: COLORS_APP.brand_colors.stemine_purple,
            fontWeight: "bold",
          }}
        >
          <img src="src\assets\logo-stemine.png" width="230px" />
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          {/* Links de Navegação Principal */}
          {nav_items.map((item) => (
            <Button
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                color: COLORS_APP.text.primary,
                textTransform: "none",
                marginRight: 2,
                padding: "6px 8px",
                minWidth: "unset",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: COLORS_APP.brand_colors.stemine_pink,
                  textDecoration: "none",
                },
              }}
            >
              {item.text}
            </Button>
          ))}

          {/* Seção de Perfil */}
          {isAuthenticated ? (
            <Box sx={{ marginLeft: 2, display: "flex", alignItems: "center" }}>
              <Button
                id="profile-menu-button"
                aria-controls={openMenu ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleMenuClick}
                sx={{
                  textTransform: "none",
                  color: COLORS_APP.brand_colors.stemine_purple,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor:
                      COLORS_APP.brand_colors.stemine_purple_light,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: COLORS_APP.brand_colors.stemine_pink,
                    color: COLORS_APP.white,
                    width: 32,
                    height: 32,
                    marginRight: 1,
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </Avatar>
                {user?.name ? user.name.split(" ")[0] : "Usuário"}
              </Button>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "profile-menu-button",
                }}
                PaperProps={{
                  sx: {
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                  }}
                >
                {/*
                  <ListItemIcon>
                    <PersonIcon
                      fontSize="small"
                      sx={{ color: COLORS_APP.text.secondary }}
                    />
                  </ListItemIcon>
                  
                    <ListItemText 
                      primary="Meu Perfil"
                    sx={{ color: COLORS_APP.text.primary }}
                  />
                */}
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon
                      fontSize="small"
                      sx={{ color: COLORS_APP.status.error }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Sair"
                    sx={{ color: COLORS_APP.status.error }}
                  />
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                backgroundColor: COLORS_APP.brand_colors.stemine_pink,
                color: COLORS_APP.white,
                textTransform: "none",
                padding: "8px 16px",
                fontWeight: "bold",
                marginLeft: 1,
                "&:hover": {
                  backgroundColor: COLORS_APP.brand_colors.stemine_pink_dark,
                },
              }}
            >
              {APP_NAVIGATION_CONTENT.header_links.login}
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
            color: COLORS_APP.brand_colors.stemine_purple,
            display: { xs: "flex", md: "none" },
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
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          display: { xs: "block", md: "none" },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon sx={{ color: COLORS_APP.text.primary }} />
          </IconButton>
        </Box>
        <List>
          {/* Navegação principal no Drawer */}
          {nav_items.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                color: COLORS_APP.text.primary,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: COLORS_APP.background.light,
                  textDecoration: "none",
                },
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
                  color: COLORS_APP.text.primary,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: COLORS_APP.background.light,
                    textDecoration: "none",
                  },
                }}
              >

              {/*
                <ListItemIcon>
                  {" "}
                  <PersonIcon
                    fontSize="small"
                    sx={{ color: COLORS_APP.text.secondary }}
                  />{" "}
                </ListItemIcon>
                <ListItemText primary="Meu Perfil" />
              */}
              </ListItem>
              <ListItem
                onClick={() => {
                  handleLogout();
                  handleDrawerToggle();
                }}
                sx={{
                  color: COLORS_APP.status.error,
                  textTransform: "none",
                  "&:hover": { backgroundColor: COLORS_APP.background.light },
                }}
              >
                <ListItemIcon>
                  {" "}
                  <LogoutIcon
                    fontSize="small"
                    sx={{ color: COLORS_APP.status.error }}
                  />{" "}
                </ListItemIcon>
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
                sx={{
                  color: COLORS_APP.text.primary,
                  textTransform: "none",
                  "&:hover": { backgroundColor: COLORS_APP.background.light },
                }}
              >
                <ListItemText
                  primary={APP_NAVIGATION_CONTENT.header_links.login}
                />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
