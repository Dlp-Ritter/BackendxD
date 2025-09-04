const express = require('express');
const router = express.Router();


// Rutas CRUD para Productos
const productController = require('../controllers/productController');

// Crear un nuevo producto
router.post('/products', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getProducts);


module.exports = router;
