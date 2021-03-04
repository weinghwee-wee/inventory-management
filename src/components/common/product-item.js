import React, { useState } from "react";
import { Typography, Avatar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  container: {
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
  avatar: {
    background: "gold",
    color: "black",
    marginRight: 15,
  },
  editButton: {
    marginRight: 3,
    borderStyle: "solid",
    borderWidth: 1,
  },
  deleteButton: {
    marginLeft: 3,
    borderStyle: "solid",
    borderWidth: 1,
  },
}));

const ProductItem = ({ itemName }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}>{itemName[0]}</Avatar>
      <Typography style={{ flex: 1, fontWeight: "bold" }}>
        {itemName}
      </Typography>
      <IconButton className={classes.editButton}>
        <EditIcon />
      </IconButton>
      <IconButton className={classes.deleteButton}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ProductItem;
