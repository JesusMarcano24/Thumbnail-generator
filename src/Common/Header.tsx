import { Container } from "reactstrap";

//MUI
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//Loader
import Loader from "./Loader";

//Login and Logout
import LogoutButton from "../Auth0/Logout";
import LoginButton from "../Auth0/Login";

//Styled
import { Avatar } from "./Styled";

//Auth0
import { useAuth0 } from "@auth0/auth0-react";

//Css
import "../index.css";

//React Router Dom
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

export default function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link to="/" className="link">
            <Typography
              sx={{
                fontSize: isLargeScreen ? "20px" : "16px",
              }}
              color="white"
              noWrap
              style={{ transition: "color 0.3s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "darkgreen")}
              onMouseOut={(e) => (e.currentTarget.style.color = "white")}
            >
              {isLargeScreen ? "I ❤ Thumbnail Generator" : "I ❤ TG"}
            </Typography>
          </Link>
          <div>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            {isAuthenticated && user?.picture && user?.name && (
              <Avatar src={user.picture} alt={user.name} />
            )}
          </div>
        </Toolbar>
      </Container>
    </>
  );
}
