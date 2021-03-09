import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { ProductItem } from "./common";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import Divider from "@material-ui/core/Divider";
import { AddProductModal, RestockModal } from "./modals";
import { CustomTooltip } from "./common";
import { createProduct, getProducts } from "../api";

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
  itemContainer: { marginTop: 30, height: 430, overflowY: "auto" },
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
  uploadContainer: { marginTop: 10, display: "flex", alignItems: "center" },
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

  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const [restockModal, setRestockModal] = useState(false);

  const {
    name,
    image,
    sellPrice,
    buyPrice,
    availableStock,
    totalSold,
  } = selectedProduct;

  const fetchProduct = async (text) => {
    const products = await getProducts(text);

    const { result } = products;

    if (result) {
      setProducts(result);
    }
  };

  const onSearch = async (name) => {
    setSelectedProduct({});
    await fetchProduct(name);
  };

  useEffect(() => {
    fetchProduct("");
  }, []);

  return (
    <div className={classes.container}>
      <AddProductModal
        visible={addProductModal}
        setVisible={setAddProductModal}
      />
      <RestockModal visible={restockModal} setVisible={setRestockModal} />
      <CustomTooltip title="Add Product" onClick={setAddProductModal} />
      <div className={classes.left}>
        <SearchBar
          className={classes.searchBar}
          onChange={(value) => {
            onSearch(value);
          }}
          onCancelSearch={() => {
            fetchProduct("");
          }}
        />
        <div className={classes.itemContainer}>
          {products.map((product) => (
            <ProductItem
              key={product._id}
              itemName={product.name}
              onClick={() => setSelectedProduct(product)}
              selected={selectedProduct.name === product.name}
            />
          ))}
        </div>
      </div>
      <div className={classes.right}>
        {selectedProduct.name ? (
          <>
            <div className={classes.rightContainer}>
              <div className={classes.titleContainer}>
                <Typography variant="h4">{name}</Typography>
                <Button
                  endIcon={<AirportShuttleIcon />}
                  className={classes.button}
                  variant="contained"
                  onClick={() => {
                    setRestockModal(true);
                  }}
                >
                  Restock
                </Button>
              </div>
              <div className={classes.imageContainer}>
                <img
                  className={classes.image}
                  alt="Contemplative Reptile"
                  src={image}
                />
              </div>
            </div>
            <Paper className={classes.detailsPaper}>
              <div className={classes.detailsContainer}>
                <ProductDetail title="buy price" description={buyPrice} />
                <ProductDetail title="sell price" description={sellPrice} />
                <ProductDetail title="stock" description={availableStock} />
              </div>
              <Divider className={classes.divider} />
              <div className={classes.detailsContainer}>
                <ProductDetail title="unit sold" description={totalSold} />
                <ProductDetail
                  title="total unit"
                  description={availableStock + totalSold}
                />
                <ProductDetail title="" description="" />
              </div>
            </Paper>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProductScreen;
