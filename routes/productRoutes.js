const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// --- RUTAS EXISTENTES ---
// Crear un nuevo producto
router.post('/products', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getProducts);

// --- NUEVAS RUTAS ---
// Conteo de productos (debe ir ANTES de /products/:id para evitar conflictos)
router.get('/products/count', productController.getProductsCount);

// Sumatoria del precio total
router.get('/products/total-price', productController.getTotalPrice);

module.exports = router;
