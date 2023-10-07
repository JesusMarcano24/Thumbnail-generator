import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            I <FavoriteIcon sx={{ pt: 1}}/> Thumbnail Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}