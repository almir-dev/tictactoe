import Paper from "@mui/material/Paper";
import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { UserStore } from "../../service/UserStore";
import { TicTacToeTable } from "./TicTacToeTable";

export function GameBoard() {
  const hostUserName = UserStore.getUserName();
  const hostUserAvatarUrl = UserStore.getUserAvatar();

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Player userName={hostUserName} avatarUrl={hostUserAvatarUrl} />
        </Grid>
        <Grid item xs={6} sx={{ mt: 10 }}>
          <TicTacToeTable />
        </Grid>
        <Grid item xs={3}>
          <Player userName={hostUserName} avatarUrl={hostUserAvatarUrl} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export function Player({ userName, avatarUrl }: { userName: string; avatarUrl?: string }) {
  const avatar = avatarUrl ? <img src={avatarUrl} alt={"nope"} width={238} height={238} /> : <PersonIcon />;

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }}>
        {userName}
      </Typography>
      <Card
        variant="outlined"
        sx={{
          width: 238,
          height: 238,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {avatar}
      </Card>
    </Box>
  );
}
