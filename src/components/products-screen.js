import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import SearchBar from "material-ui-search-bar";
import { ProductItem } from "./common";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import Divider from "@material-ui/core/Divider";
import { AddProductModal, RestockModal } from "./modals";
import { CustomTooltip } from "./common";
import { getProducts, deleteProduct } from "../services/api";
import { showModalAction } from "../redux/actions";
import { deleteFile } from "../firebase/firebase-utils";

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
    maxHeight: "100%",
    maxWidth: "100%",
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
  uploadContainer: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  messageConatiner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "#DCEBF3",
    borderRadius: 20,
    padding: 20,
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
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const [restockModal, setRestockModal] = useState(false);

  const {
    name,
    imageUrl,
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

  const onDeleteProduct = async () => {
    dispatch(
      showModalAction(
        `Delete ${name}`,
        `Are you sure you want to delete ${name} from your list?`,
        "Delete",
        "Cancel",
        async () => {
          await deleteProduct(selectedProduct._id);
          await deleteFile(selectedProduct.imageName);

          const filteredProducts = products.filter(
            (product) => product._id !== selectedProduct._id
          );

          setSelectedProduct({});
          setProducts(filteredProducts);
        }
      )
    );
  };

  useEffect(() => {
    fetchProduct("");
  }, [addProductModal]);

  return (
    <div className={classes.container}>
      <AddProductModal
        details={selectedProduct}
        visible={addProductModal}
        setVisible={setAddProductModal}
        setSelectedProduct={setSelectedProduct}
      />
      <RestockModal visible={restockModal} setVisible={setRestockModal} />
      <CustomTooltip
        title="Add Product"
        onClick={() => {
          setSelectedProduct({});
          setAddProductModal(true);
        }}
      />
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
          {products.length ? (
            <>
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  itemName={product.name}
                  selected={selectedProduct._id === product._id}
                  onClick={() => setSelectedProduct(product)}
                  onDelete={onDeleteProduct}
                  onEdit={() => {
                    setAddProductModal(true);
                  }}
                />
              ))}
            </>
          ) : (
            <div className={classes.messageConatiner}>
              <Typography variant="h6" style={{ color: "#808080" }}>
                No product available.
              </Typography>
              <Typography variant="h6" style={{ color: "#808080" }}>
                Create one now!
              </Typography>
            </div>
          )}
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
                  src={imageUrl}
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
