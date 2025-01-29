const pool = require('../back/config');

// Función para agregar un comentario
async function agregarComentario(lugarId, name, comentario) {
  const result = await pool.query(
    'INSERT INTO comentarios (lugar_id, name, comentario) VALUES ($1, $2, $3) RETURNING *',
    [lugarId, name, comentario]
  );
  return result.rows[0];
}

// Función para listar comentarios por lugar
async function listarComentariosPorLugar(lugarId) {
  const result = await pool.query(
    'SELECT id, lugar_id, name, comentario FROM comentarios WHERE lugar_id = $1',
    [lugarId]
  );
  return result.rows;
}

// Función para actualizar un comentario
async function actualizarComentario(id, name, comentario) {
  const result = await pool.query(
    'UPDATE comentarios SET name = $1, comentario = $2 WHERE id = $3 RETURNING *',
    [name, comentario, id]
  );
  return result.rows[0];
}

// Función para eliminar un comentario
async function eliminarComentario(id) {
  const result = await pool.query(
    'DELETE FROM comentarios WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];}

module.exports = {
  agregarComentario,
  listarComentariosPorLugar,
  actualizarComentario,
  eliminarComentario
};


  
