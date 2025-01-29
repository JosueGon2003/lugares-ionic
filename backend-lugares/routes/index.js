const express = require('express');
const router = express.Router();

// Importar los controladores de lugares y usuarios
const lugarRoutes = require('./lugarRoutes');
const userRoutes = require('./userRoutes');

// Definir las rutas principales
router.use('/api', lugarRoutes);  // Ruta base para lugares
router.use('/api', userRoutes);   // Ruta base para usuarios

module.exports = router;
