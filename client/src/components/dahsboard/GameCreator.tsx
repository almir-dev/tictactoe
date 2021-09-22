import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React, { useState } from "react";

export function GameCreator() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Host</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
