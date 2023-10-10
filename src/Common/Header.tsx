import AppBar from '@mui/material/AppBar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import "../index.css"

//React Router Dom
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/" className='link'>
            <Typography variant="h6" color="white" noWrap>
              I <FavoriteIcon sx={{ pt: 1}}/> Thumbnail Generator
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}