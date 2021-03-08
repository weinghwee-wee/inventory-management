import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { ProductItem } from "./common";
import logo from "../saltedegg.jpg";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import Divider from "@material-ui/core/Divider";

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
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  rightContainer: {
    display: "flex",
    width: "100%",
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
    marginLeft: 10,
    width: 200,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "black",
  },
  image: {
    height: "100%",
  },
  tableCell: { background: "yellow" },
  button: {
    textTransform: "none",
    background: "gold",
    width: 150,
    padding: 10,
    fontSize: 15,
    fontWeight: "bold",
    "&:hover": {
      background: "gold",
    },
  },
  paper: {
    width: "100%",
    textAlign: "center",
    width: "30%",
    padding: 10,
  },
  detailsPaper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: "95%",
  },
  detailsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  description: {
    fontWeight: "bolder",
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
}));

const ProductDetail = ({ title, description }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Typography variant="overline">{title}</Typography>
      <Typography variant="subtitle1" className={classes.description}>
        {description}
      </Typography>
    </div>
  );
};
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
        <div className={classes.rightContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h4">Keropok</Typography>
            <Button
              endIcon={<AirportShuttleIcon />}
              className={classes.button}
              variant="contained"
            >
              Restock
            </Button>
          </div>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              alt="Contemplative Reptile"
              src={logo}
            />
          </div>
        </div>
        <Paper className={classes.detailsPaper}>
          <div className={classes.detailsContainer}>
            <ProductDetail title="buy price" description="15" />
            <ProductDetail title="sell price" description="15" />
            <ProductDetail title="stock" description="15" />
          </div>
          <Divider className={classes.divider} />
          <div className={classes.detailsContainer}>
            <ProductDetail title="unit sold" description="15" />
            <ProductDetail title="total unit" description="15" />
            <ProductDetail title="" description="" />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ProductScreen;
