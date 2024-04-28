"use client";
import React, { ReactNode, useEffect } from "react";
import styles from "./auth.module.css";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {
    // If user is already authenticated redirect him to category page
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("authenticated") ?? "false")) {
            redirect("/product/category");
        }
    }, []);

    return <div className={styles.auth_container}>{children}</div>;
};

export default Layout;
