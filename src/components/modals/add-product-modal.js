import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createProduct, editProduct } from "../../api";
import { uploadFile } from "../../firebase/firebase-utils";
import { showModalAction } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  uploadContainer: { marginTop: 10, display: "flex", alignItems: "center" },
}));

const AddProductModal = ({
  details,
  visible,
  setVisible,
  setSelectedProduct,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [sellPrice, setSellPrice] = useState(0.0);
  const [buyPrice, setBuyPrice] = useState(0.0);
  const [availableStock, setAvailableStock] = useState(0);
  const [selectedFile, setSelectedFile] = useState({});

  useEffect(() => {
    setName(details.name || "");
    setSellPrice(details.sellPrice || 0.0);
    setBuyPrice(details.buyPrice || 0.0);
    setAvailableStock(details.availableStock || 0);
    setSelectedFile({ name: details.imageName });
  }, [details]);

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

  const onEdit = async () => {
    let imageUrl;
    let updateObject = {
      name,
      sellPrice,
      buyPrice,
      availableStock,
    };

    if (details.imageName !== selectedFile.name) {
      imageUrl = await uploadFile(selectedFile);
      updateObject.imageName = selectedFile.name;
      updateObject.imageUrl = imageUrl;
    }

    const response = await editProduct(details._id, updateObject);
    setSelectedProduct(response.result);

    dispatch(
      showModalAction(
        "Successfully Edited Product",
        `${name} is successfully edited.`,
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
      <DialogTitle id="form-dialog-title">
        {details.name ? `Edit ${details.name}` : "Add New Product"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Product Name"
          fullWidth
          value={name}
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
          value={sellPrice}
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
          value={buyPrice}
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
          value={availableStock}
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
        <Button onClick={details.name ? onEdit : onAdd} color="primary">
          {details.name ? "Edit" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
