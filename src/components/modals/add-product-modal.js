import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  uploadContainer: { marginTop: 10, display: "flex", alignItems: "center" },
}));

const AddProductModal = ({visible, setVisible}) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState("");

  const closeModal = () => {
    setVisible(false);
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0].name);
  };

  return (
    <Dialog
      open={visible}
      onBackdropClick={() => {
        closeModal();
      }}
    >
      <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Product Name"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Sell Price"
          type="email"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Buy Price"
          type="email"
          fullWidth
        />
        <div className={classes.uploadContainer}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            style={{ marginRight: 15 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onFileChange}
            />
          </Button>
          <Typography>{selectedFile}</Typography>
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

export default AddProductModal;
