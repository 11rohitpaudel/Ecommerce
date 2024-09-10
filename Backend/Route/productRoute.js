const express = require("express");
const { productName, productPrice, productDescription, productRating, productCategory, productImage, totalProduct, relatedProduct, deleteProduct, getProductById, updateProduct
} = require("../Controller/productController");
const { addProduct, getAllProduct } = require("../Controller/productController");
const upload = require("../Utils/upload");


const router = express.Router();

router.post("/addproduct", upload.single('productImage'), addProduct);
router.get("/getproduct", getAllProduct);
router.get("/related-products/:id", relatedProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/product/:id", getProductById);
router.put("/update-product/:id", upload.single('productImage'), updateProduct);






module.exports = router;