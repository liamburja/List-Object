const jwt = require('jsonwebtoken');

let verificarAuth = (req, res, next) => {

  let token = req.get('token');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        mensaje: 'Error con el token'
      })
    }

      req.usuario = decoded.data;

      next();
  })

}

let verificaRol = (req, res, next) => {

  let rol = req.usuario.role;

  if (rol === 'ADMIN') {
    next();
  } else {
    return res.status(401).json({
      mensaje: 'Rol no autorizado'
    })
  }


}

module.exports = {verificarAuth, verificaRol};
