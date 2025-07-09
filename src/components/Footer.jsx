import React from 'react';
import {
  Box,
  Typography,
  Link,
  Stack,
  Divider, 
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';
import {colors} from '../constants/Colors'; 
import { menu_buttons } from '../constants/Messages'; 
import { navItems } from '../utils/NavItems';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.background.dark,
        color: colors.white,
        padding: { xs: '30px 20px', md: '50px 80px' },
        marginTop: 'auto',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 4, md: 8 }} 
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'flex-start' }}
        sx={{ margin: '0 auto', marginBottom: '40px' }} 
      >
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '250px' } }}>
          <Typography variant="h6" gutterBottom sx={{ color: colors.white, fontWeight: 'bold' }}>
            STEMINE
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text.secondary_light }}>
            {menu_buttons.footer.description}
          </Typography>
        </Box>


        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '150px' } }}>
          <Typography variant="h6" gutterBottom sx={{ color: colors.white, fontWeight: 'bold' }}>
            {menu_buttons.footer.links}
          </Typography>
          <Stack spacing={1}>
            {navItems.map((item) => (
              <Link
                key={item.text}
                component={RouterLink} 
                to={item.path}
                underline="none"
                sx={{
                  color: colors.text.secondary_light,
                  '&:hover': {
                    color: colors.brand_colors.stemine_pink, 
                    textDecoration: 'underline',
                  },
                }}
              >
                <Typography variant="body2">{item.text}</Typography>
              </Link>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '200px' } }}>
          <Typography variant="h6" gutterBottom sx={{ color: colors.white, fontWeight: 'bold' }}>
            {menu_buttons.footer.contact.title}
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon sx={{ color: colors.text.secondary_light, fontSize: '1.2rem' }} />
              <Link
                href={`mailto:${menu_buttons.footer.contact.email}`}
                underline="none"
                sx={{
                  color: colors.text.secondary_light,
                  '&:hover': {
                    color: colors.brand_colors.stemine_pink,
                    textDecoration: 'underline',
                  },
                }}
              >
                <Typography variant="body2">{menu_buttons.footer.contact.email}</Typography>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ color: colors.text.secondary_light, fontSize: '1.2rem' }} />
              <Link
                href={`tel:${menu_buttons.footer.contact.cellphone.replace(/\D/g, '')}`} 
                underline="none"
                sx={{
                  color: colors.text.secondary_light,
                  '&:hover': {
                    color: colors.brand_colors.stemine_pink,
                    textDecoration: 'underline',
                  },
                }}
              >
                <Typography variant="body2">{menu_buttons.footer.contact.cellphone}</Typography>
              </Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ color: colors.text.secondary_light, fontSize: '1.2rem' }} />
              <Typography variant="body2" sx={{ color: colors.text.secondary_light }}>
                {menu_buttons.footer.contact.location}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ borderColor: colors.white, opacity: 0.5, marginBottom: '20px' }} />

      <Typography variant="body2" align="center" sx={{ color: colors.text.secondary_light }}>
        {menu_buttons.footer.rights_reserved}
      </Typography>
    </Box>
  );
};

export default Footer;