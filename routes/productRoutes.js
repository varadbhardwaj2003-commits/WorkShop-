const express = require("express");
const router = express.Router();
const cacheMiddleware = require("../middleware/cache");
const productController = require("../controllers/productController");

router.use(cacheMiddleware);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.patch("/:id", productController.patchProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
