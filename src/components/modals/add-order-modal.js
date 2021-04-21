import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { getProducts, createOrder } from "../../api";

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
  netTotal: {
    display: "flex",
    justifyContent: "space-between",
  },
  flexOne: {
    flex: 1,
  },
}));

const AddOrderModal = ({ visible, setVisible }) => {
  const classes = useStyles();
  const [itemList, setItemList] = useState([]);
  const [itemCart, setItemCart] = useState({});
  const [data, setData] = useState({
    name: "",
    location: "",
    phoneNumber: "",
  });
  const [total, setTotal] = useState(0.00);
  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    setData({
      name: "",
      location: "",
      phoneNumber: "",
    });
    setTotal(0);
    setShippingFee(0);
  }, [visible]);

  const calculateTotal = () => {
    let tempTotal = 0.00;

    for (let key in itemCart) {
      const { sellPrice, amount } = itemCart[key];
      tempTotal = tempTotal + sellPrice * amount;
    }

    setTotal(tempTotal)
  };

  const updateData = (key, value) => {
    const temp = data;
    temp[key] = value;
    setData(temp);
  };

  const onAdd = async () => {
    const { name, location, phoneNumber} = data;

    const newOrder = await createOrder(name, location, phoneNumber, total, itemCart, shippingFee)

    console.log(newOrder)
  };

  const closeModal = () => {
    setVisible(false);
  };

  const buildInitialCart = (products) => {
    let initialCart = {};

    products.forEach((product) => {
      const { name, sellPrice } = product;

      initialCart[name] = {
        sellPrice,
        amount: 0,
      };
    });
    setItemCart(initialCart);
  };

  const setItemAmount = (itemId, amount) => {
    const temp = itemCart;

    temp[itemId].amount = amount;
    setItemCart(temp);
  };

  const fetchProduct = async () => {
    const { result: products } = await getProducts();
    setItemList(products);
    buildInitialCart(products);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Dialog
      open={visible}
      onBackdropClick={() => {
        closeModal();
      }}
    >
      <DialogTitle id="form-dialog-title">Add New Order</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          onChange={(e) => {
            updateData("name", e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="location"
          label="Location"
          fullWidth
          onChange={(e) => {
            updateData("location", e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="phonenumber"
          label="Phone Number"
          fullWidth
          onChange={(e) => {
            updateData("phoneNumber", e.target.value);
          }}
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
          onChange={(e) => {
            updateData("date", e.target.value);
          }}
        />
        <div className={classes.itemContainer}>
          <Typography className={classes.item}>Items</Typography>
          {itemList.map((item) => (
            <>
              <div className={classes.amount}>
                <Typography className={classes.flexOne} variant="outline">
                  {item.name}
                </Typography>
                <Typography className={classes.flexOne} variant="outline">
                  RM {item.sellPrice}
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
                  onChange={(e) => {
                    setItemAmount(item.name, parseInt(e.target.value));
                    calculateTotal();
                  }}
                />
              </div>
              <Divider className={classes.divider} />
            </>
          ))}
        </div>
        <TextField
          autoFocus
          label="Shipping Fee"
          margin="dense"
          id="fee"
          type="number"
          fullWidth
          onChange={(e) => {
            setShippingFee(parseFloat(e.target.value));
          }}
        />
        <div className={classes.total}>
          <Typography>Total (RM)</Typography>
          <Typography>{total.toFixed(2)}</Typography>
        </div>
        <div className={classes.netTotal}>
          <Typography>Net Total (RM)</Typography>
          <Typography>{(total + shippingFee).toFixed(2)}</Typography>
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

export default AddOrderModal;
