const db = require('../db');

// --- CREATE ---
// Crear un nuevo producto (POST /api/products)
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

exports.getProducts = async (req, res) => { 
    try {
        const result = await db.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

// --- READ ---
// Obtener todos los productos (GET /api/products)


