const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false
  },
  // Configuraciones optimizadas para Session Pooler
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Verifica la conexión al iniciar
pool.connect()
  .then(client => {
    console.log('Conexión a PostgreSQL (Supabase) establecida exitosamente.');
    client.release();
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err.message);
    console.error('Verifica tus credenciales en el archivo .env');
  });

// Manejo de errores del pool
pool.on('error', (err) => {
  console.error('Error inesperado en el pool de conexiones:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
