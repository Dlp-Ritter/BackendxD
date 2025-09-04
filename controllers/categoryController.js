const db = require('../db');

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories ORDER BY name');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
}

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
}

// Obtener productos por categoría (relación 1 a muchos)
exports.getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const result = await db.query(`
            SELECT 
                p.*,
                c.name as category_name,
                c.description as category_description
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE c.id = $1
            ORDER BY p.name
        `, [categoryId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos para esta categoría' });
        }
        
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
}
