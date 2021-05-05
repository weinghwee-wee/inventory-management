import React from "react";
import { Typography, Avatar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  containerNormal: {
    display: "flex",
    flexDirection: "row",
    background: "#DCEBF3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    cursor: "pointer",
    marginBottom: 10,
    marginRight: 5,
  },
  containerSelected: {
    display: "flex",
    flexDirection: "row",
    background: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    cursor: "pointer",
    marginBottom: 10,
    marginRight: 5,
  },
  avatar: {
    background: "gold",
    color: "black",
    marginRight: 15,
  },
  editButton: {
    marginLeft: 6,
    marginRight: 3,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    height: 25,
    width: 25,
  },
  deleteButton: {
    marginLeft: 3,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    color: "white",
    height: 25,
    width: 25,
  },
  itemName: {
    flex: 1,
    fontWeight: "bold",
  },
  itemNameSelected: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
  },
}));

const ProductItem = ({ onDelete, onEdit, onClick, itemName, selected }) => {
  const classes = useStyles();

  return (
    <div
      className={selected ? classes.containerSelected : classes.containerNormal}
      onClick={onClick}
    >
      <Avatar className={classes.avatar}>{itemName[0]}</Avatar>
      <Typography
        className={selected ? classes.itemNameSelected : classes.itemName}
      >
        {itemName}
      </Typography>
      {selected ? (
        <>
          <IconButton className={classes.editButton} onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.deleteButton} onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      ) : null}
    </div>
  );
};

export default ProductItem;
