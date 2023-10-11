import AppBar from '@mui/material/AppBar';
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
              I ❤ Thumbnail Generator
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
}