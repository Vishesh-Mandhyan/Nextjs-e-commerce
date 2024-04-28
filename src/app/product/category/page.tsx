"use client";
import React, { useState } from "react";
import Category from "./components/Category"; // Import the Category component
import { TextField, Button } from "@mui/material";
import styles from "./category.module.css";
import { addCategory, deleteCategory, getCategories } from "./apiUtils";
import useSWR from "swr";

const Categories: React.FC = () => {
    const [newCategory, setNewCategory] = useState("");

    // fetching categories data
    const {
        data: categories,
        isLoading,
        error,
        mutate,
    } = useSWR("categories", getCategories, {});

    if (isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Error...</>;
    }

    const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await addCategory(newCategory);
            mutate();
            setNewCategory("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCategory = async (name: string) => {
        try {
            await deleteCategory(name);
            mutate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <form onSubmit={handleAddCategory} className={styles.categoryForm}>
                <TextField
                    label="New Category"
                    value={newCategory}
                    onChange={(event) => setNewCategory(event.target.value)}
                    fullWidth
                    required
                    size="small"
                    autoComplete="offs"
                />
                <Button type="submit" variant="contained" color="primary">
                    Add&nbsp;Category
                </Button>
            </form>
            <ul>
                {categories?.map((category) => (
                    <Category
                        key={category.name}
                        name={category.name}
                        onDelete={handleDeleteCategory}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Categories;
