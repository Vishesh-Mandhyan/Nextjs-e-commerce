"use client";
import React, { useState, useEffect } from "react";
// import { Product } from './ProductService'; // Import the Product interface
// import { getProducts } from './ProductService'; // Import the get products function
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Switch,
} from "@mui/material";
import styles from "../listing.module.css"; // Import the CSS module (optional)
import useSWR from "swr";
import { enableDisableProduct, getProducts } from "../apiUtils";
import Image from "next/image";

const ProductsList: React.FC = () => {
  //  Get all products
  const {
    data: products,
    isLoading,
    error,
  } = useSWR("/products", getProducts, {});

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <>
      <Typography variant="h2">Products</Typography>
      <Grid container spacing={2} className={styles.productsList}>
        {products && products.length > 0 ? (
          products.map((product: Product) => (
            <Grid item key={product.name} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Image
                      src={product.imageUrl}
                      alt="Product Image"
                      width={200}
                      height={150}
                    />
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body2">
                      Price: ${product.price}
                    </Typography>
                    <Switch
                      {...label}
                      checked={product.active}
                      onChange={(e, checked) =>
                        enableDisableProduct(product.name, checked)
                      }
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProductsList;
