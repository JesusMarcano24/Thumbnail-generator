import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      color="secondary"
      sx={{mr: 1}}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      <LogoutIcon sx={{mr: 1}}/> Log out
    </Button>
  );
};

export default LogoutButton;
