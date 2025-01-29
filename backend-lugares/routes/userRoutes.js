const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registrar', userController.registrarUsuario);  // Registro de usuarios
router.get('/verificarAdmin', userController.verificarAdmin);

// Ruta para el login de un usuario
router.post('/login', userController.loginUsuario);  // Login de usuarios

module.exports = router;
