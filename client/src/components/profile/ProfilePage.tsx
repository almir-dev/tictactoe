import React, { ChangeEvent, useCallback, useState } from "react";
import { Box, Paper, TextField, Typography } from "@mui/material";
import Auth from "../../service/auth/Auth";
import { ImageUpload } from "./image-upload/ImageUpload";
import { UserService } from "../../service/UserService";
import { UserStore } from "../../service/UserStore";

export interface ProfilePageProps {
  /** Authentication service. */
  auth: Auth;
}

export function ProfilePage({ auth }: ProfilePageProps) {
  const userName = auth.getAccessToken();
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 5, mt: 2 }}>
        <Welcome />
        <UserName />
        <ImageUpload />
      </Paper>
    </Box>
  );
}

function Welcome() {
  const text = `Welcome ${UserStore.getUserName()}`;
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }}>
      {text}
    </Typography>
  );
}

function UserName() {
  const [userName, setUserName] = useState(UserStore.getUserName());

  const handleTextChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserName(event.target.value);
    UserService.updateUserName(event.target.value);
  }, []);

  return (
    <TextField
      id="outlined-basic"
      label="User Name"
      variant="outlined"
      value={userName}
      onChange={handleTextChange}
      sx={{ mb: 4 }}
    />
  );
}
