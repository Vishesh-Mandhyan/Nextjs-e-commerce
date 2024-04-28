"use client"
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from "../auth.module.css"
import { handleLogin } from '../apiUtils';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Clear previous error

        try {
            await handleLogin(email, password);
            router.push("/product/category");
            console.log('Login successful!');
        } catch (error) {
            setError((error as Error).message); // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.auth_form}>
            <h2 className={styles.auth_form_h2}>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <TextField
                label="Email"
                variant="outlined"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </form>
    );
};

export default LoginPage;
