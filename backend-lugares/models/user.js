const pool = require('../back/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Insertar un nuevo usuario (registro)
async function registrarUsuario(username, password, role = 'user', email, phone, firstName, lastName, city) {
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const result = await client.query(
      `INSERT INTO users (username, password, role, email, phone, first_name, last_name, city) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, username, role, email, phone, first_name, last_name, city`,
      [username, hashedPassword, role, email, phone, firstName, lastName, city]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Verificar si un usuario existe por nombre de usuario
async function verificarUsuario(username) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0]; // Retorna el usuario si existe
  } finally {
    client.release();
  }
}

// Validar las credenciales del usuario (para login)
async function validarCredenciales(username, password) {
  try {
    // Busca al usuario en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const usuario = result.rows[0];

    if (!usuario) {
      console.log('Usuario no encontrado');
      return null; // Usuario no existe
    }

    // Compara la contraseña ingresada con la encriptada
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      console.log('Contraseña incorrecta');
      return null; // Contraseña no coincide
    }

    return usuario; // Credenciales válidas
  } catch (error) {
    console.error('Error en validarCredenciales:', error);
    throw error; // Lanza el error al controlador
  }
}

// Crear un JWT (token de autenticación) para el usuario
function crearJWT(usuario) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está definido');
  }

  const payload = {
    id: usuario.id,
    username: usuario.username,
    role: usuario.role,
    email: usuario.email,
    phone: usuario.phone,
    first_name: usuario.first_name,
    last_name: usuario.last_name,
    city: usuario.city,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

module.exports = { registrarUsuario, verificarUsuario, validarCredenciales, crearJWT };

