const db = require("../database/db");

async function getAllProducts() {
    return await db.readFileWithDelay();
}

async function getProductById(id) {
    const products = await db.readFileWithDelay();
    return products.find((p) => p.id === id);
}

async function createProduct(productData) {
    const products = db.readFile();
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    db.writeFile(products);
    return newProduct;
}

async function updateProduct(id, productData) {
    const products = db.readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updatedProduct = { id, ...productData };
    products[index] = updatedProduct;
    db.writeFile(products);
    return updatedProduct;
}

async function patchProduct(id, productData) {
    const products = db.readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updatedProduct = { ...products[index], ...productData, id };
    products[index] = updatedProduct;
    db.writeFile(products);
    return updatedProduct;
}

async function deleteProduct(id) {
    const products = db.readFile();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const [deleted] = products.splice(index, 1);
    db.writeFile(products);
    return deleted;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
