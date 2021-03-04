import React, { useState } from "react";
import { TextField, Typography, Avatar, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { ProductItem } from "./common";

const useStyles = makeStyles((theme) => ({}));

const ProductScreen = () => {
  const classes = useStyles();

  return (
    <div style={{ height: "80%", width: "100%", display: "flex" }}>
      <div style={{ flex: 2, background: "white", padding: 10 }}>
        <SearchBar
          style={{ boxShadow: "none", background: "#DCEBF3", borderRadius: 20 }}
        />
        <div style={{ marginTop: 30, height: "100%", overflowY: "auto" }}>
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
          <ProductItem itemName="Keropok" />
        </div>
      </div>
      <div style={{ flex: 5, background: "#DCEBF3" }}></div>
    </div>
  );
};

export default ProductScreen;
