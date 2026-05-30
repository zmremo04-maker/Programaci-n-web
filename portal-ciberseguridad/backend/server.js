const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const solicitudesRoutes = require('./routes/solicitudes.routes');
const correosRoutes = require('./routes/correos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente');
});

// Ruta para probar conexión con MySQL
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');

    res.json({
      mensaje: 'Conexión a MySQL exitosa',
      resultado: rows[0].resultado
    });
  } catch (error) {
    console.error('Error al conectar con MySQL:', error);

    res.status(500).json({
      mensaje: 'Error al conectar con la base de datos',
      error: error.message
    });
  }
});

// Rutas del sistema
app.use('/api/solicitudes', solicitudesRoutes);
app.use('/api/correos', correosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});