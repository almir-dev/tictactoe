import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React, { ChangeEvent, useCallback, useState } from "react";
import { GameService } from "../../service/GameService";
import { CircularProgress } from "@mui/material";

export interface GameCreatorProps {
  onGameCreated: () => void;
}

export function GameCreator({ onGameCreated }: GameCreatorProps) {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleHost = useCallback(() => {
    setLoading(true);
    GameService.createGame(roomName).then(() => {
      setOpen(false);
      setLoading(false);
      onGameCreated();
    });
  }, [onGameCreated, roomName]);

  const handleClose = useCallback(() => {
    setLoading(false);
    setOpen(false);
  }, []);

  const handleRoomNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRoomName(event.target.value);
    },
    []
  );

  const actionSection = loading ? (
    <CircularProgress />
  ) : (
    <>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleHost}>Host</Button>
    </>
  );

  return (
    <div>
      <Button
        variant="contained"
        sx={{ overflow: "hidden", mt: 4, ml: 4 }}
        onClick={handleClickOpen}
      >
        Host Game
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Game Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in the name of the room, and start playing
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room name"
            type="text"
            fullWidth
            variant="standard"
            value={roomName}
            onChange={handleRoomNameChange}
          />
        </DialogContent>
        <DialogActions>{actionSection}</DialogActions>
      </Dialog>
    </div>
  );
}
