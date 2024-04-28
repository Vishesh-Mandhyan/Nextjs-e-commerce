import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

export interface SideBarRoutesType {
    name: string;
    icon: JSX.Element;
    route: string;
    collapsible: boolean;
    subRoutes?: {
        name: string;
        route: string;
    }[];
}

export const sideBarRoutes: SideBarRoutesType[] = [
    {
        name: "Categories",
        route: "category",
        icon: <CategoryOutlinedIcon />,
        collapsible: false,
    },
    {
        name: "Listings",
        route: "listing",
        icon: <Inventory2OutlinedIcon />,
        collapsible: true,
        subRoutes: [
            {
                name: "Add product",
                route: "add-product",
            },
            {
                name: "View products",
                route: "view-products",
            }
        ],
    },
];
