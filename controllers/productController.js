const productService = require("../services/productService");

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Error reading file" });
    }
}

async function getProductById(req, res) {
    try {
        const productId = Number(req.params.id);
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Error reading file" });
    }
}

async function createProduct(req, res) {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Error saving data" });
    }
}

async function updateProduct(req, res) {
    try {
        const productId = Number(req.params.id);
        const updatedProduct = await productService.updateProduct(productId, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Error updating data" });
    }
}

async function patchProduct(req, res) {
    try {
        const productId = Number(req.params.id);
        const updatedProduct = await productService.patchProduct(productId, req.body);

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: "Error updating data" });
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = Number(req.params.id);
        const deletedProduct = await productService.deleteProduct(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(deletedProduct);
    } catch (err) {
        res.status(500).json({ error: "Error deleting data" });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
