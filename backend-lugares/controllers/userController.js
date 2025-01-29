const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await User.verificarUsuario(username);
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
    }

    const nuevoUsuario = await User.registrarUsuario(username, password, role);
    res.status(201).json({ message: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Login de un usuario
exports.loginUsuario = async (req, res) => {
  const { username, password } = req.body;

  console.log('Datos recibidos en el backend:', { username, password });

  try {
    // Valida las credenciales del usuario
    const usuario = await User.validarCredenciales(username, password);
    console.log('Usuario encontrado:', usuario);

    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales incorrectas' });
    }

    // Genera un token JWT
    const token = User.crearJWT(usuario);
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en loginUsuario:', error); // Log detallado del error
    res.status(500).json({ message: 'Error al procesar el login' });
  }
};

// Middleware para verificar si el usuario es administrador
exports.verificarAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtiene el token del encabezado
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }

    req.usuario = decoded; // Añade el usuario decodificado al request
    next(); // Continuar con la siguiente acción
  });
};

// Middleware para verificar si el usuario está autenticado
exports.verificarAutenticacion = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtiene el token del encabezado
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.usuario = decoded; // Añade el usuario decodificado al request
    next(); // Continuar con la siguiente acción
  });
};