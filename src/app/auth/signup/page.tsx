"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "../auth.module.css"; // Import the CSS module
import bcrypt from "bcryptjs";
import { handleSignUp } from "../apiUtils";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetailsState>({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value,
        });
    };

    const encryptPassword = async (): Promise<string> => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userDetails.password, saltRounds);
        return hashedPassword
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null); // Clear previous error

        if (!userDetails.username || !userDetails.email || !userDetails.password) {
            setError("Please fill in all fields.");
            return;
        }

        // Validate Email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
            setError("Invalid email format.");
            return;
        }

        // encrypting password
        const encryptedPassword = await encryptPassword();

        try {
            await handleSignUp({ ...userDetails, password: encryptedPassword });
            router.push("/product/category");
            console.log("SignUp successful!");
        } catch (error) {
            setError((error as Error).message); // Set error message
        }
    };

    const navigateToLogin = () => {
        router.push("/auth/login");
    }

    return (
        <form onSubmit={handleSubmit} className={styles.auth_form}>
            <h2 className={styles.auth_form_h2}>Sign Up</h2>
            {error && <p className={styles.error}>{error}</p>}
            <TextField
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
            </Button>
            <Typography>
                Already have an account?
                <Button onClick={navigateToLogin}>Login</Button>
            </Typography>
        </form>
    );
};

export default SignUpForm;
