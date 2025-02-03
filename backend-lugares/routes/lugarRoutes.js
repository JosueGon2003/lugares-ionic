const express = require('express');
const lugarController = require('../controllers/lugarController');
const userController = require('../controllers/userController');
const router = express.Router();
const Comentario = require('../models/comentario'); // Importa el modelo Comentario

// Rutas públicas (sin autenticación)
router.get('/lugares', lugarController.listarLugares); // Listar todos los lugares
router.get('/lugares/:id', lugarController.obtenerLugar); // Obtener un lugar por ID

// Rutas protegidas para administradores
router.post('/lugares', userController.verificarAdmin, lugarController.agregarLugar); // Solo admin puede agregar
router.put('/lugares/:id', userController.verificarAdmin, lugarController.modificarLugar); // Solo admin puede modificar
router.delete('/lugares/:id', userController.verificarAdmin, lugarController.eliminarLugar); // Solo admin puede eliminar
router.get('/comentarios', userController.verificarAutenticacion, lugarController.listarComentarios);

// Ruta para agregar un comentario a un lugar
router.post('/:lugarId/comentarios', userController.verificarAutenticacion, async (req, res) => {
  const { lugarId } = req.params;
  const { name, comentario } = req.body;

  try {
    const nuevoComentario = await Comentario.agregarComentario(lugarId, name, comentario);
    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    res.status(500).json({ message: 'Error al agregar comentario', error: error.message });
  }
});

// Ruta para listar comentarios de un lugar
router.get('/:lugarId/comentarios', userController.verificarAutenticacion, async (req, res) => {
  const { lugarId } = req.params;

  try {
    const comentarios = await Comentario.listarComentariosPorLugar(lugarId);
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al listar comentarios:', error);
    res.status(500).json({ message: 'Error al listar comentarios', error: error.message });
  }
});

// Ruta para actualizar un comentario
router.put('/comentarios/:id', userController.verificarAutenticacion, async (req, res) => {
  const { id } = req.params;
  const { name, comentario } = req.body;

  try {
    const comentarioActualizado = await Comentario.actualizarComentario(id, name, comentario);
    if (!comentarioActualizado) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json(comentarioActualizado);
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    res.status(500).json({ message: 'Error al actualizar comentario', error: error.message });
  }
});

// Ruta para eliminar un comentario
router.delete('/comentarios/:id', userController.verificarAutenticacion, async (req, res) => {
  const { id } = req.params;

  try {
    const comentarioEliminado = await Comentario.eliminarComentario(id);
    if (!comentarioEliminado) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json({ message: 'Comentario eliminado' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ message: 'Error al eliminar comentario', error: error.message });
  }
});

module.exports = router;