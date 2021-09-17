import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import Button from "@mui/material/Button";
import Auth from "../../service/auth/Auth";
import React from "react";
import { UserMenu } from "./UserMenu";

export interface MenuBarProps {
  /** Authentication service. */
  auth: Auth;
}

export function MenuBar({ auth }: MenuBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Headline />
          <LogAction auth={auth} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Headline() {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Tic Tac Toe
    </Typography>
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
