import { mutate } from "swr";

export const getProducts = (): Promise<Product[]> => {
    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("products") ?? "[]"));
        }, 500);
    });
};

export const addProduct = async (product: Product) => {
    const allProducts = await getProducts();

    // Making product default active
    const newProduct = { ...product, active: true };

    // appending new product with products
    const products = [...allProducts, newProduct];

    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage.setItem("products", JSON.stringify(products));
            resolve(true);
        }, 500);
    });
};

export const enableDisableProduct = async (
    productName: string,
    status: boolean
) => {
    const allProducts = await getProducts();

    // changing product status here
    const updatedProducts = allProducts.map((product) => {
        if (product.name === productName) {
            return { ...product, active: status };
        }
        return product;
    });

    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            mutate("/products");
            resolve(true);
        }, 100);
    });
};

export const deleteProduct = async (productName: string) => {
    const allProducts = await getProducts();

    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const productExists = allProducts.some((element) => element.name === productName);

            // If Product doesn't exist throw an error
            if (!productExists) {
                reject(new Error('Category does not exist'));
            }

            const remainingProducts = allProducts.filter((element) => element.name !== productName);
            localStorage.setItem("products", JSON.stringify(remainingProducts));
            mutate("/products");
            resolve(true);
        }, 500);
    });
};