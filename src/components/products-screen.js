import React, { useState } from "react";
import {
  TextField,
  Typography,
  Avatar,
  IconButton,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { ProductItem } from "./common";
import logo from "../saltedegg.jpg";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "80%",
    width: "100%",
    display: "flex",
  },
  left: {
    flex: 2,
    background: "white",
    padding: 10,
  },
  searchBar: { boxShadow: "none", background: "#DCEBF3", borderRadius: 20 },
  itemContainer: { marginTop: 30, height: "100%", overflowY: "auto" },
  right: {
    flex: 5,
    background: "#DCEBF3",
    padding: 50,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    height: "50%",
    paddingRight: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: 250,
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
  },
  image: {
    height: "100%",
  },
  tableCell: { background: "yellow" },
}));

const ProductScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <SearchBar className={classes.searchBar} />
        <div className={classes.itemContainer}>
          <ProductItem itemName="Keropok" selected={true} />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" selected={true} />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
        </div>
      </div>
      <div className={classes.right}>
        <>
          <div className={classes.infoContainer}>
            <Typography variant="h4">Keropok</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableRow>
                  <TableCell variant="head" className={classes.tableCell}>
                    Purchase Price (RM per unit):
                  </TableCell>
                  <TableCell>17</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant="head" className={classes.tableCell}>
                    Sell Price (RM per unit):{" "}
                  </TableCell>
                  <TableCell>20</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </div>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              alt="Contemplative Reptile"
              src={logo}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductScreen;
