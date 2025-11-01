import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/configuration.js';

export const validateTokenMiddleware = (req, res, next) => {
  // en la cabecera Authorization viene el token
  // el formato es: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.json({
      status: 401,
      OK: false,
      message: 'No se ha proporcionado token de autenticación',
    });
    return;
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, CONFIG.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({
      status: 401,
      OK: false,
      message: 'Token inválido o expirado',
    });
    return;
  }
};
