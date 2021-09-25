import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useCallback, useState } from "react";

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

export function TicTacToeTable() {
  const [values, setValues] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);
  const handleItem1 = useCallback(() => {
    setValues(updateValues(values, 0, "X"));
  }, [values]);
  const handleItem2 = useCallback(() => {
    setValues(updateValues(values, 1, "X"));
  }, [values]);
  const handleItem3 = useCallback(() => {
    setValues(updateValues(values, 2, "X"));
  }, [values]);
  const handleItem4 = useCallback(() => {
    setValues(updateValues(values, 3, "X"));
  }, [values]);
  const handleItem5 = useCallback(() => {
    setValues(updateValues(values, 4, "X"));
  }, [values]);
  const handleItem6 = useCallback(() => {
    setValues(updateValues(values, 5, "X"));
  }, [values]);
  const handleItem7 = useCallback(() => {
    setValues(updateValues(values, 6, "X"));
  }, [values]);
  const handleItem8 = useCallback(() => {
    setValues(updateValues(values, 7, "X"));
  }, [values]);
  const handleItem9 = useCallback(() => {
    setValues(updateValues(values, 8, "X"));
  }, [values]);

  return (
    <Box sx={{ mb: 10 }}>
      <Grid container spacing={1}>
        <Grid container item>
          <TableItem onClick={handleItem1} value={values[0]} />
          <TableItem onClick={handleItem2} value={values[1]} />
          <TableItem onClick={handleItem3} value={values[2]} />
        </Grid>
        <Grid container item>
          <TableItem onClick={handleItem4} value={values[3]} />
          <TableItem onClick={handleItem5} value={values[4]} />
          <TableItem onClick={handleItem6} value={values[5]} />
        </Grid>
        <Grid container item>
          <TableItem onClick={handleItem7} value={values[6]} />
          <TableItem onClick={handleItem8} value={values[7]} />
          <TableItem onClick={handleItem9} value={values[8]} />
        </Grid>
      </Grid>
    </Box>
  );
}
