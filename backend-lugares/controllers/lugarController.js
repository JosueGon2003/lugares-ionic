const pool = require('../back/config');
const userController = require('./userController');

// Listar todos los lugares turísticos
exports.listarLugares = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM lugares');
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los lugares turísticos' });
  }
};

// Obtener un lugar específico por ID
exports.obtenerLugar = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM lugares WHERE id = $1', [id]);
    client.release();
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el lugar' });
  }
};

// Agregar un nuevo lugar turístico
exports.agregarLugar = async (req, res) => {
  const { titulo, imagen, comentarios = '' } = req.body; // Valor por defecto para comentarios
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO lugares (titulo, imagen, comentarios) VALUES ($1, $2, $3) RETURNING *',
      [titulo, imagen, comentarios]
    );
    client.release();

    res.status(201).json({ message: 'Lugar agregado exitosamente', lugar: result.rows[0] });
  } catch (error) {
    console.error('Error al agregar el lugar:', error); // Log para depuración
    res.status(500).json({ message: 'Error al agregar el lugar', error: error.message });
  }
};

// Modificar un lugar turístico
// Modificar un lugar turístico
exports.modificarLugar = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen, comentarios } = req.body;
  try {
    const client = await pool.connect();

    // Actualizar el lugar
    const result = await client.query(
      'UPDATE lugares SET titulo = $1, imagen = $2 WHERE id = $3 RETURNING *',
      [titulo, imagen, id]
    );

    // Actualizar los comentarios
    if (comentarios && comentarios.length > 0) {
      for (const comentario of comentarios) {
        await client.query(
          'UPDATE comentarios SET name = $1, comentario = $2 WHERE id = $3',
          [comentario.name, comentario.comentario, comentario.id]
        );
      }
    }

    client.release();
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.status(200).json({ message: 'Lugar modificado exitosamente', lugar: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar el lugar', error: error.message });
  }
};
// Eliminar un lugar turístico
exports.eliminarLugar = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM lugares WHERE id = $1 RETURNING *', [id]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Lugar no encontrado' });
    }

    res.status(200).json({ message: 'Lugar eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el lugar:', error);
    res.status(500).json({ message: 'Error al eliminar el lugar', error: error.message });
  }
};