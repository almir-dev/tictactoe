import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import { Game } from "../../service/rest/GameResource";
import { UserStore } from "../../service/UserStore";
import { Typography } from "@mui/material";
import { GameService } from "../../service/GameService";
import { User } from "../../service/rest/UserResource";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: 105,
  color: theme.palette.text.secondary,
  maxWidth: 150,
  height: 150,
  width: 150,
  cursor: "pointer",
}));

function TableItem({ value, onClick }: { value: string; onClick: () => void }) {
  return (
    <Grid item xs={4}>
      <Item onClick={onClick}>{value}</Item>
    </Grid>
  );
}

function updateValues(values: string[], i: number, v: string) {
  const updateValues = [...values];
  updateValues[i] = v;
  return updateValues;
}

export function TicTacToeTable({ game, opponent }: { game: Game; opponent: User }) {
  const [values, setValues] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);
  const [activeTurn, setActiveTurn] = useState(false);
  const [sign, setSign] = useState<string>("X");

  let pollInterval: number;

  const pollState = useCallback(() => {}, []);

  useEffect(() => {
    const isActivePlayer = game.activePlayer === UserStore.getUserId();
    setSign(isActivePlayer ? "X" : "0");
    setActiveTurn(isActivePlayer);
    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  const handleItem = useCallback(
    (item: number) => {
      if (activeTurn) {
        setValues(updateValues(values, item, sign));
        setActiveTurn(false);
        GameService.updateGameBoard(game.gameId, [], opponent.userId);
      }
    },
    [values, activeTurn, game.gameId, sign]
  );

  console.log("WWW foo", game.activePlayer, UserStore.getUserId());
  const activePlayerName = game.activePlayer === UserStore.getUserId() ? UserStore.getUserName() : opponent.userName;

  return (
    <Box sx={{ mb: 10 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2, textAlign: "center", fontSize: 50 }}>
        {activePlayerName + `'s turn ...`}
      </Typography>
      <Grid container spacing={1}>
        <Grid container item>
          <TableItem onClick={() => handleItem(0)} value={values[0]} />
          <TableItem onClick={() => handleItem(1)} value={values[1]} />
          <TableItem onClick={() => handleItem(2)} value={values[2]} />
        </Grid>
        <Grid container item>
          <TableItem onClick={() => handleItem(3)} value={values[3]} />
          <TableItem onClick={() => handleItem(4)} value={values[4]} />
          <TableItem onClick={() => handleItem(5)} value={values[5]} />
        </Grid>
        <Grid container item>
          <TableItem onClick={() => handleItem(6)} value={values[6]} />
          <TableItem onClick={() => handleItem(7)} value={values[7]} />
          <TableItem onClick={() => handleItem(8)} value={values[8]} />
        </Grid>
      </Grid>
    </Box>
  );
}
