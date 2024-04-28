"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "../listing.module.css";
import useSWR, { mutate } from "swr";
import { getCategories } from "../../category/apiUtils";
import { FormControl, InputLabel, Typography } from "@mui/material";
import { addProduct } from "../apiUtils";
import { useRouter } from "next/navigation";

const ProductForm: React.FC = () => {
  const router = useRouter();
  // fetching categories data
  const {
    data: categories,
    isLoading,
    error,
  } = useSWR("categories", getCategories, {});

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    try {
      await addProduct(Object.fromEntries(formData) as unknown as Product);
      mutate("/products");
      router.push("/product/listing/view-products");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <Typography variant="h3">Add Product</Typography>
      <TextField
        label="Product Name"
        variant="outlined"
        required
        fullWidth
        name="name" // Add name prop
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        name="description" // Add name prop
      />
      <TextField
        label="Price"
        variant="outlined"
        required
        type="number"
        fullWidth
        name="price" // Add name prop
      />
      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        name="imageUrl" // Add name prop
      />
      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category" // Add name prop
          label="Category"
          defaultValue={categories && categories[0].name}
          placeholder="Category"
        >
          {categories?.map((option: Category) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
