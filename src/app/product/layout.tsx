"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { sideBarRoutes } from "../utils/sideBarRoutes";
import { usePathname, useRouter } from "next/navigation";
import { Button, Collapse, useTheme } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

export default function PermanentDrawerLeft({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const theme = useTheme();
    const [open, setOpen] = React.useState<boolean>(false);

    // check if given route is active route
    function isActiveRoute(route: string) {
        const lastSlashIndex = pathname.lastIndexOf("/");
        // if '/' doesn't exist in the pathname return false
        if (lastSlashIndex === -1) {
            return false;
        }
        if (route === pathname.substring(lastSlashIndex + 1)) {
            return true;
        }
        return false;
    }

    // function for handling navigation on sidebar
    const handleNavigation = (route: string) => {
        router.push(`/product/${route}`);
    };

    const handleSubRouteNavigation = (route: string, subRoute: string) => {
        router.push(`/product/${route}/${subRoute}`);
    };

    const handleLogout = () => {
        // Check Authentication to false
        localStorage.setItem("authenticated", "false");
        router.push("/auth/login");
    };

    // If user is not authenticated redirect him to login page
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("authenticated") ?? "false")) {
            router.push("/auth/login");
        }
    }, [router]);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" noWrap component="div">
                        E-Commerce
                    </Typography>
                    <Button variant="contained" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Typography variant="h5">Admin Panel</Typography>
                </Toolbar>
                <Divider />
                {/* Side Bar Routes */}
                <List>
                    {sideBarRoutes.map((item, index) => {
                        return !item.collapsible ? (
                            <ListItem disablePadding key={item.name}>
                                <ListItemButton
                                    sx={{
                                        background: isActiveRoute(item.route)
                                            ? theme.palette.primary.main
                                            : {},
                                    }}
                                    onClick={() => handleNavigation(item.route)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ) : (
                            <List key={item.name}>
                                <ListItem disablePadding >
                                    <ListItemButton
                                        onClick={() => {
                                            setOpen(!open);
                                        }}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name} />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    {item.subRoutes?.map((subRoute) => (
                                        <ListItem component="div" disablePadding key={subRoute.route}>
                                            <ListItemButton
                                                sx={{
                                                    background: isActiveRoute(subRoute.route)
                                                        ? theme.palette.primary.main
                                                        : "transparent",
                                                    pl: 4,
                                                }}
                                                onClick={() =>
                                                    handleSubRouteNavigation(item.route, subRoute.route)
                                                }
                                            >
                                                <ListItemText primary={subRoute.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </Collapse>
                            </List>
                        );
                    })}
                </List>
            </Drawer>
            {/* Main Section */}
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
