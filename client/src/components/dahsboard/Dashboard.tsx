import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { GameService, GameViewModel } from "../../service/GameService";
import { GameCreator } from "./GameCreator";
import { GameTable } from "./GameTable";
import { LinearProgress } from "@mui/material";

export interface DashboardContextProps {
  onDelete: (row: GameViewModel) => Promise<void>;
  onJoin: (row: GameViewModel) => void;
}

export const DashboardContext = React.createContext<DashboardContextProps>({
  onDelete: () => Promise.resolve(),
  onJoin: () => {},
});

export function Dashboard() {
  const [games, setGames] = useState<GameViewModel[]>([]);
  const [loading, setLoading] = useState(false);

  const reloadGames = useCallback(() => {
    setLoading(true);
    GameService.getAvailableGames()
      .then((result) => {
        setLoading(false);
        setGames(result);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    reloadGames();
  }, [reloadGames]);

  const handleGameCreated = useCallback(() => {
    reloadGames();
  }, [reloadGames]);

  const handleJoin = useCallback((row: GameViewModel) => {}, []);

  const handleDelete = useCallback(
    (row: GameViewModel) => {
      return GameService.deleteGame(row.gameId).then(() => {
        reloadGames();
      });
    },
    [reloadGames]
  );

  const contextValue: DashboardContextProps = {
    onDelete: handleDelete,
    onJoin: handleJoin,
  };

  const content = loading ? <LinearProgress sx={{ mt: 10, mb: 10 }} /> : <GameTable games={games} />;

  return (
    <DashboardContext.Provider value={contextValue}>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
        <GameCreator onGameCreated={handleGameCreated} />
        {content}
      </Paper>
    </DashboardContext.Provider>
  );
}
