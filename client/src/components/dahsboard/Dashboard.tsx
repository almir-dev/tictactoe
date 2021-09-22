import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { GameService, GameViewModel } from "../../service/GameService";
import { GameCreator } from "./GameCreator";

interface Column {
  id: "gameId" | "gameName" | "host" | "createdAt" | "players" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "gameId", label: "Game number", minWidth: 10 },
  { id: "gameName", label: "Room name", minWidth: 10 },
  { id: "host", label: "Host", minWidth: 10 },
  { id: "createdAt", label: "Created", minWidth: 10 },
  { id: "players", label: "Players", minWidth: 10 },
  { id: "action", label: "Join", minWidth: 10 },
];

export function Dashboard() {
  const [games, setGames] = useState<GameViewModel[]>([]);

  const reloadGames = () => {
    GameService.getAvailableGames().then((result) => {
      setGames(result);
    });
  };

  useEffect(() => {
    reloadGames();
  }, [reloadGames]);

  const handleGameCreated = useCallback(() => {
    reloadGames();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <GameCreator onGameCreated={handleGameCreated} />
      <GameTable games={games} />
    </Paper>
  );
}

export function GameTable({ games }: { games: GameViewModel[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <TableContainer sx={{ maxHeight: 1200 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {games
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.gameId}
                  >
                    {columns.map((column) => {
                      const key = `${row.gameId}-${column.id}`;
                      return (
                        <CellRenderer column={column} row={row} key={key} />
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={games.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function CellRenderer({ column, row }: { column: Column; row: GameViewModel }) {
  if (column.id === "action") {
    return (
      <TableCell
        key={column.id}
        align={column.align}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Button variant="contained" color="success" sx={{ width: 150 }}>
          Join
        </Button>
      </TableCell>
    );
  }

  const value = row[column.id];
  return (
    <TableCell key={column.id} align={column.align}>
      {value}
    </TableCell>
  );
}
