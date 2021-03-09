import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    alignSelf: "flex-start",
  },
  amount: {
    display: "flex",
    alignItems: "center",
    width: "80%",
  },
  divider: {
    width: "80%",
    marginLeft: 20,
    marginRight: 20,
    margin: 5,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
  },
  flexOne: {
    flex: 1,
  },
}));

const AddOrderModal = ({ visible, setVisible }) => {
  const classes = useStyles();

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
      <DialogTitle id="form-dialog-title">Add New Order</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" id="name" label="Name" fullWidth />
        <TextField
          autoFocus
          margin="dense"
          id="location"
          label="Location"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="phonenumber"
          label="Phone Number"
          fullWidth
        />
        <TextField
          autoFocus
          label="Date"
          margin="dense"
          id="date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={classes.itemContainer}>
          <Typography className={classes.item}>Items</Typography>
          <div className={classes.amount}>
            <Typography className={classes.flexOne} variant="outline">
              Keropok
            </Typography>
            <TextField
              className={classes.flexOne}
              autoFocus
              margin="dense"
              id="phonenumber"
              label="Amount"
              fullWidth
              type="number"
              inputProps={{ min: "0" }}
              defaultValue="0"
            />
          </div>
          <Divider className={classes.divider} />
          <div className={classes.amount}>
            <Typography className={classes.flexOne} variant="outline">
              Keropok
            </Typography>
            <TextField
              className={classes.flexOne}
              autoFocus
              margin="dense"
              id="phonenumber"
              label="Amount"
              fullWidth
              type="number"
              inputProps={{ min: "0" }}
              defaultValue="0"
            />
          </div>
          <Divider className={classes.divider} />
        </div>
        <TextField
          autoFocus
          label="Shipping Fee"
          margin="dense"
          id="fee"
          type="number"
          fullWidth
        />
        <div className={classes.total}>
          <Typography>Total</Typography>
          <Typography>300</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
        <Button onClick={closeModal} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderModal;
