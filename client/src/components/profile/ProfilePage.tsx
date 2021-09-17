import React, { ChangeEvent, useCallback, useState } from "react";
import { Box, Paper, TextField, Typography } from "@mui/material";
import Auth from "../../service/auth/Auth";

export interface ProfilePageProps {
  /** Authentication service. */
  auth: Auth;
}

export function ProfilePage({ auth }: ProfilePageProps) {
  const userName = auth.getAccessToken();
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 5, mt: 2 }}>
        <Welcome userName={userName} />
        <UserName />
      </Paper>
    </Box>
  );
}

function Welcome({ userName }: { userName: string }) {
  const text = `Welcome ${userName}`;
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }}>
      {text}
    </Typography>
  );
}

function UserName() {
  const [userName, setUserName] = useState("");

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    []
  );

  return (
    <TextField
      id="outlined-basic"
      label="User Name"
      variant="outlined"
      value={userName}
      onChange={handleTextChange}
    />
  );
}
