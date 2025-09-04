const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Obtener todas las categorías
router.get('/categories', categoryController.getCategories);

// Crear una nueva categoría
router.post('/categories', categoryController.createCategory);

// Obtener productos por categoría (relación 1 a muchos)
router.get('/categories/:categoryId/products', categoryController.getProductsByCategory);

module.exports = router;
