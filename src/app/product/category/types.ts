interface Category {
    name: string;
}

interface CategoryProps {
    name: string;
    onDelete?: (name: string) => void; // Optional delete function
}