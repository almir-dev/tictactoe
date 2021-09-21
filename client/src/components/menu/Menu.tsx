import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import Button from "@mui/material/Button";
import Auth from "../../service/auth/Auth";
import React, { useCallback } from "react";
import { UserMenu } from "./UserMenu";
import { useHistory } from "react-router-dom";
import DashboardCustomizeSharpIcon from "@mui/icons-material/DashboardCustomizeSharp";

export interface MenuBarProps {
  /** Authentication service. */
  auth: Auth;
}

export function MenuBar({ auth }: MenuBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Headline auth={auth} />
          <LogAction auth={auth} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Headline({ auth }: { auth: Auth }) {
  const history = useHistory();

  const handleHomeNavigation = useCallback(() => {
    history.push("/");
  }, []);

  const handleDashboardNavigation = useCallback(() => {
    history.push("/dashboard");
  }, []);

  return (
    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, cursor: "pointer" }}
    >
      <span onClick={handleHomeNavigation}>Tic Tac Toe</span>
      <DashboardMenuItem auth={auth} onClick={handleDashboardNavigation} />
    </Typography>
  );
}

function DashboardMenuItem({
  auth,
  onClick,
}: {
  auth: Auth;
  onClick: () => void;
}) {
  if (!auth.isAuthenticated()) {
    return null;
  }

  return (
    <IconButton
      size="large"
      aria-label="dahsboard"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={() => {}}
      color="inherit"
      sx={{ ml: 2 }}
    >
      <DashboardCustomizeSharpIcon onClick={onClick} />
    </IconButton>
  );
}

function LogAction({ auth }: { auth: Auth }) {
  const isAuthenticated = auth.isAuthenticated();

  if (isAuthenticated) {
    return <UserMenu auth={auth} />;
  }

  return <Login auth={auth} />;
}

function Login({ auth }: { auth: Auth }) {
  const handleLogin = () => {
    auth.login();
  };

  return (
    <Button color="inherit" onClick={handleLogin}>
      Login
    </Button>
  );
}
