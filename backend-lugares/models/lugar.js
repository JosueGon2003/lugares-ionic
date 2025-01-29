const pool = require('../back/config');

// Listar todos los lugares
async function listarLugares() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM lugares');
    return result.rows;
  } finally {
    client.release();
  }
}

// Insertar un nuevo lugar
async function insertarLugar(titulo, imagen) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO lugares (titulo, imagen) VALUES ($1, $2) RETURNING id, titulo, imagen',
      [titulo, imagen]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Modificar un lugar
async function modificarLugar(id, titulo, imagen) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE lugares SET titulo = $1, imagen = $2 WHERE id = $3 RETURNING id, titulo, imagen',
      [titulo, imagen, id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Eliminar un lugar
async function eliminarLugar(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM lugares WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Obtener un lugar por ID
async function obtenerLugarPorId(id) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM lugares WHERE id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

module.exports = { listarLugares, insertarLugar, modificarLugar, eliminarLugar, obtenerLugarPorId };
