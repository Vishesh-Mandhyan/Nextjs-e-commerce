import React from "react";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

const page = () => {
  redirect("/auth/login");
  return <div>page</div>;
};

export default page;
