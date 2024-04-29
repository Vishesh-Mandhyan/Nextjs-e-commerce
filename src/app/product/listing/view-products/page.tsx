"use client";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Switch,
  IconButton,
} from "@mui/material";
import styles from "../listing.module.css"; // Import the CSS module (optional)
import useSWR from "swr";
import { deleteProduct, enableDisableProduct, getProducts } from "../apiUtils";
import Image from "next/image";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
              <Card className={styles.productCard}>
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
                <IconButton
                  aria-label="delete"
                  onClick={async () => await deleteProduct(product.name)}
                  className={styles.productDeleteBtn}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
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
