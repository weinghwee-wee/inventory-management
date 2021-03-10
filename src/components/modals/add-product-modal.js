import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createProduct } from "../../api";
import { uploadFile } from "../../firebase/firebase-utils";
import { showModalAction } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  uploadContainer: { marginTop: 10, display: "flex", alignItems: "center" },
}));

const AddProductModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState(0.0);
  const [buyPrice, setBuyPrice] = useState(0.0);
  const [availableStock, setAvailableStock] = useState(0);
  const [selectedFile, setSelectedFile] = useState({});

  const onAdd = async () => {
    const imageUrl = await uploadFile(selectedFile);

    await createProduct(
      name,
      selectedFile.name,
      imageUrl,
      sellPrice,
      buyPrice,
      availableStock
    );

    dispatch(
      showModalAction(
        "Successfully Added Product",
        `${name} is successfully added to the list.`,
        null,
        "Close"
      )
    );

    closeModal();
  };

  const closeModal = async () => {
    setSelectedFile({});
    setVisible(false);
  };

  const onFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
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
          fullWidth
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="sell"
          label="Sell Price"
          type="number"
          fullWidth
          onChange={(e) => {
            setSellPrice(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="buy"
          label="Buy Price"
          type="number"
          fullWidth
          onChange={(e) => {
            setBuyPrice(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="stock"
          label="Available Stock"
          type="number"
          inputProps={{ min: "0" }}
          fullWidth
          onChange={(e) => {
            setAvailableStock(e.target.value);
          }}
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
          <Typography>{selectedFile.name}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
