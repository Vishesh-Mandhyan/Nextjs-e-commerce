"use client"
import React, { useState } from 'react';
import Category from './components/Category'; // Import the Category component
import { TextField, Button } from '@mui/material';
import styles from './category.module.css';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newCategory) return; // Prevent adding empty categories

        setCategories([...categories, { name: newCategory }]);
        setNewCategory('');
    };

    const handleDeleteCategory = (name: string) => {
        setCategories(categories.filter((category) => category.name !== name));
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
                    size='small'
                    autoComplete='offs'

                />
                <Button type="submit" variant="contained" color="primary">
                    Add&nbsp;Category
                </Button>
            </form>
            <ul>
                {categories.map((category) => (
                    <Category key={category.name} name={category.name} onDelete={handleDeleteCategory} />
                ))}
            </ul>
        </div>
    );
};

export default Categories;
