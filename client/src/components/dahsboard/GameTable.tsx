import { GameViewModel } from "../../service/GameService";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { DashboardContext, DashboardContextProps } from "./Dashboard";

interface Column {
  id: "gameId" | "gameName" | "host" | "createdAt" | "players" | "join" | "delete";
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
  { id: "join", label: "Join", minWidth: 10 },
  { id: "delete", label: "Delete", minWidth: 10 },
];

export function GameTable({ games }: { games: GameViewModel[] }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
      <TableContainer sx={{ maxHeight: 1200 }}>
        <Table stickyHeader aria-label="sticky table">
          <GameTableHead />
          <GameTableBody games={games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
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

export function GameTableHead() {
  const columnComponent = columns.map((column) => {
    return (
      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
        {column.label}
      </TableCell>
    );
  });

  return (
    <TableHead>
      <TableRow>{columnComponent}</TableRow>
    </TableHead>
  );
}

export function GameTableBody({ games }: { games: GameViewModel[] }) {
  const rowComponents = games.map((row) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.gameId}>
        <GameTableCells row={row} />
      </TableRow>
    );
  });

  return <TableBody>{rowComponents}</TableBody>;
}

export function GameTableCells({ row }: { row: GameViewModel }) {
  const cellComponents = columns.map((column) => {
    const key = `${row.gameId}-${column.id}`;
    return <CellRenderer column={column} row={row} key={key} />;
  });

  return <>{cellComponents}</>;
}

function CellRenderer({ column, row }: { column: Column; row: GameViewModel }) {
  if (column.id === "join") {
    return (
      <TableCell key={column.id} align={column.align}>
        <JoinGameButton />
      </TableCell>
    );
  }

  if (column.id === "delete") {
    return (
      <TableCell key={column.id} align={column.align}>
        <DeleteGameButton row={row} />
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

export function DeleteGameButton({ row }: { row: GameViewModel }) {
  const [loading, setLoading] = useState(false);
  const dashboardContext = useContext<DashboardContextProps>(DashboardContext);

  const handleDelete = useCallback(() => {
    setLoading(true);
    dashboardContext.onDelete(row).catch(() => setLoading(false));
  }, [dashboardContext, row]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Button variant="contained" color="error" sx={{ width: 150 }} onClick={handleDelete}>
      Delete
    </Button>
  );
}

export function JoinGameButton() {
  return (
    <Button variant="contained" color="success" sx={{ width: 150 }}>
      Join
    </Button>
  );
}
