import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { showModalAction } from "../../redux/actions";
import { restockProduct } from "../../services/api";

const RestockModal = ({ productId, visible, setVisible, setSelectedProduct }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  const closeModal = () => {
    setVisible(false);
  };

  const onRestock = async () => {
    const { result: updatedProduct } = await restockProduct(productId, amount);
    setSelectedProduct(updatedProduct);
    closeModal();

    dispatch(
      showModalAction(
        `Successfully Restock Product ${updatedProduct.name}`,
        `${updatedProduct.name} is successfully restocked by ${amount}.`,
        null,
        "Close"
      )
    );
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
          inputProps={{ min: "0" }}
          onChange={(e) => { setAmount(e.target.value); }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
        <Button onClick={onRestock} color="primary">
          Restock
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestockModal;
