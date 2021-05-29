import React, { useState, useEffect } from "react";
import moment from "moment";
import _, { forEach } from "lodash";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from "@material-ui/core/Typography";
import { getProducts, createOrder, editOrder, deleteOrder } from "../../services/api";
import { showModalAction } from "../../redux/actions";

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
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greenButton: {
    marginRight: 24,
    background: "#00FF21",
  },
  yellowButton: {
    marginRight: 24,
    background: "yellow",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    color: "red",
    cursor: "pointer"
  }
}));

const AddOrderModal = ({
  visible,
  setVisible,
  selectedOrder,
  setSelectedOrder,
}) => {
  const classes = useStyles();
  const [itemList, setItemList] = useState([]);
  const [itemCart, setItemCart] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState(0.0);
  const [shippingFee, setShippingFee] = useState(0);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    const { name, location, phoneNo, total, shippingFee, date, items, status } =
      selectedOrder;

    if (items) {
      setItemCart({ ...itemCart, ...buildInitialCart(items) });
    }

    setName(name || "");
    setLocation(location || "");
    setPhoneNumber(phoneNo || "");
    setDate(date ? moment(date).format("YYYY-MM-DD") : "");
    setTotal(total || 0);
    setShippingFee(shippingFee || 0);
    setStatus(status || "");
  }, [visible]);

  const calculateTotal = () => {
    let tempTotal = 0.0;

    for (let key in itemCart) {
      const { sellPrice, amount } = itemCart[key];
      tempTotal = tempTotal + sellPrice * amount;
    }

    setTotal(tempTotal);
  };

  const onAdd = async () => {
    const clearedItemCart = removeEmptyItem();

    const response = await createOrder(
      name,
      location,
      phoneNumber,
      total,
      clearedItemCart,
      shippingFee
    );

    dispatch(
      showModalAction(
        "Successfully Added Order",
        `Created a new order for ${name} with total amount of RM${total}.`,
        null,
        "Close"
      )
    );

    closeModal();
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedOrder({});
    resetItemCart();
  };

  const buildInitialCart = (products) => {
    let initialCart = {};

    products.forEach((product) => {
      const { name, sellPrice, _id, amount } = product;

      initialCart[name] = {
        _id,
        sellPrice,
        amount: amount || 0,
      };
    });

    return initialCart;
  };

  const resetItemCart = () => {
    let tempItemCart = itemCart;

    for (let key in tempItemCart) {
      tempItemCart[key].amount = 0;
    }

    setItemCart(tempItemCart);
  };

  const setItemAmount = (itemId, amount) => {
    const temp = itemCart;

    temp[itemId].amount = amount;
    setItemCart(temp);
  };

  const fetchProduct = async () => {
    const { result: products } = await getProducts();
    setItemList(products || []);
    setItemCart(buildInitialCart(products || []));
  };

  const onStatusClick = async () => {
    let newStatus;

    if (status === "New") {
      newStatus = "Completed";
    } else {
      newStatus = "New";
    }

    setStatus(newStatus);

    await editOrder(selectedOrder._id, { status: newStatus });
  };

  const onEditClick = async (orderId) => {
    const clearedItemCart = removeEmptyItem();

    const newBody = {
      name,
      location,
      phoneNo: phoneNumber,
      total,
      shippingFee,
      date,
      items: clearedItemCart,
    };

    await editOrder(selectedOrder._id, newBody);

    dispatch(
      showModalAction(
        "Successfully Edited Order",
        `Order is updated.`,
        null,
        "Close"
      )
    );

    closeModal();
  };

  const removeEmptyItem = () => {
    const tempItemCart = _.cloneDeep(itemCart);

    for (let key in tempItemCart) {
      if (tempItemCart[key].amount === 0) {
        delete tempItemCart[key];
      }
    }

    let itemArray = [];

    for (let key in tempItemCart) {
      const { _id, sellPrice, amount } = tempItemCart[key];
      itemArray.push({
        name: key,
        _id,
        sellPrice,
        amount,
      });
    }

    return itemArray;
  };

  return (
    <Dialog
      open={visible}
      onBackdropClick={() => {
        closeModal();
      }}
    >
      <div className={classes.titleContainer}>
        <DialogTitle id="form-dialog-title">{selectedOrder.name ? "Edit Order" : "Add New Order"}</DialogTitle>
        {status.length ? (
          <Button
            variant="contained"
            className={
              status === "New" ? classes.greenButton : classes.yellowButton
            }
            onClick={onStatusClick}
          >
            {status}
          </Button>
        ) : null}
      </div>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="location"
          label="Location"
          fullWidth
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="phonenumber"
          label="Phone Number"
          fullWidth
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <TextField
          autoFocus
          label="Date"
          margin="dense"
          id="date"
          type="date"
          fullWidth
          value={date}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setDate(e.target.value);
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
                  value={itemCart[item.name] ? itemCart[item.name].amount : 0}
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
          value={shippingFee}
          InputLabelProps={{
            shrink: true,
          }}
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
      <DialogActions className={classes.dialogActions}>
        <div>
          {selectedOrder.name ? (
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={() => {
                dispatch(
                  showModalAction(
                    "Delete Order",
                    "Are you sure you want to delete this order?",
                    "Yes",
                    "Cancel",
                    async () => {
                      await deleteOrder(selectedOrder._id);
                      closeModal();
                    }
                  )
                );
              }} />
          ) : null}
        </div>
        <div>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={selectedOrder.name ? onEditClick : onAdd}
            color="primary"
            disabled={!(name && location && phoneNumber && date && removeEmptyItem().length)}
          >
            {selectedOrder.name ? "Edit" : "Add"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderModal;
