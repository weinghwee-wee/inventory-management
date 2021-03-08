import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const RestockModal = ({visible, setVisible}) => {
  const [amount, setAmount] = useState(0);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Dialog
      open={visible}
      onBackdropClick={() => {
        closeModal();
      }}
    >
      <DialogTitle id="form-dialog-title">Restock</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          inputProps={{ min: "0"}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
        <Button onClick={closeModal} color="primary">
          Restock
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestockModal;
