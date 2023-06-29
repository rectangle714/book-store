import * as React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Box, Container } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Styles from './Footer.module.css';

const Footer = () => {
    const [value, setValue] = React.useState(0);

    return (
     <footer className={Styles.footer}>
      <Container maxWidth="sm" fixed>
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            sx={{bgcolor:'green'}}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction sx={{color:'white'}} label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction sx={{color:'white'}} label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction sx={{color:'white'}} label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </Container>
    </footer>
    );
}

export default Footer;