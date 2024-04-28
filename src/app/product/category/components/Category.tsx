import React from 'react';
import styles from '../category.module.css';

const Category: React.FC<CategoryProps> = ({ name, onDelete }) => {
    return (
        <div className={styles.category}>
            <p>{name}</p>
            {onDelete && (
                <button className={styles.deleteButton} onClick={() => onDelete(name)}>
                    Delete
                </button>
            )}
        </div>
    );
};

export default Category;
