export const getCategories = (): Promise<Category[]> => {
    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("categories") ?? "[]"));
        }, 500);
    });
};

export const addCategory = async (categoryName: string) => {
    const allCategories = await getCategories();
    const newCategory = { name: categoryName };

    // appending new Category with categories
    const categories = [...allCategories, newCategory];

    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage.setItem("categories", JSON.stringify(categories));
            resolve(true);
        }, 500);
    });
};

export const deleteCategory = async (categoryName: string) => {
    const allCategories = await getCategories();

    // simulating api response with promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const categoryExists = allCategories.some((element) => element.name === categoryName);

            //If Category doesn't exist throw an error
            if (!categoryExists) {
                reject(new Error('Category does not exist'));
            }

            const remainingCategories = allCategories.filter((element) => element.name !== categoryName);
            localStorage.setItem("categories", JSON.stringify(remainingCategories));
            resolve(true);
        }, 500);
    });
};
