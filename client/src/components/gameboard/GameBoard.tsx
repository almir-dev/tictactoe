import Paper from "@mui/material/Paper";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { UserStore } from "../../service/UserStore";
import { TicTacToeTable } from "./TicTacToeTable";
import { GameService } from "../../service/GameService";
import { Game } from "../../service/rest/GameResource";
import { User, UserResource } from "../../service/rest/UserResource";
import { UserService } from "../../service/UserService";
import internal from "stream";

export function GameBoard() {
  const pathName = window.location.pathname;
  const gameId = pathName.substring(pathName.lastIndexOf("/") + 1);

  const [game, setGame] = useState<Game>();
  const [opponent, setOpponent] = useState<User>();

  let interval: number;

  const pollGame = useCallback(() => {
    GameService.getGame(gameId).then((result) => {
      if (result.players.length === 2 && !opponent) {
        setGame(game);
        const opponentId = result.players.filter((p) => p.playerId !== UserStore.getUserId())[0].playerId;
        UserService.findUser(opponentId).then((p) => {
          setOpponent(p);
          clearInterval(interval);
        });
      }
    });
  }, [gameId]);

  useEffect(() => {
    GameService.getGame(gameId).then((result) => {
      setGame(result);
      if (result.players.length === 2) {
        const opponentId = result.players.filter((p) => p.playerId !== UserStore.getUserId())[0].playerId;
        UserService.findUser(opponentId).then((p) => {
          setOpponent(p);
          clearInterval(interval);
        });
      }
    });

    // @ts-ignore
    interval = setInterval(() => {
      pollGame();
    }, 3000);

    console.log("WWW creating interval", interval);

    return () => {
      clearInterval(interval);
    };
  }, [gameId]);

  const tableComponent = opponent && game ? "Game Table not yet implemented !" : <CircularProgress />;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Player userName={UserStore.getUserName()} avatarUrl={UserStore.getUserAvatar()} />
        </Grid>
        <Grid item xs={6} sx={{ mt: 10 }}>
          {tableComponent}
        </Grid>
        <Grid item xs={3}>
          <Player userName={opponent?.userName} avatarUrl={opponent?.avatar} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export function Player({
  userName,
  avatarUrl,
  opponent,
}: {
  userName?: string;
  avatarUrl?: string;
  opponent?: boolean;
}) {
  let avatar = avatarUrl ? <img src={avatarUrl} alt={"nope"} width={238} height={238} /> : <PersonIcon />;

  if (!userName) {
    avatar = <CircularProgress />;
  }

  const text = userName ? userName : "Waiting for opponent";

  const nameComponent = (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }}>
      {text}
    </Typography>
  );

  return (
    <Box sx={{ p: 5 }}>
      {nameComponent}
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
