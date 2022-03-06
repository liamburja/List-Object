let express = require('express');
let router = express.Router();

//Import de User
import User from '../models/user';

import { verificarAuth, verificaRol } from '../middlewares/autentification';

//Encrypting
const bcrypt = require('bcrypt');
const saltRounds = 10;

const _ = require('underscore');

router.post('/new-user', async (req, res) => {
  
  const body = {
    nombre: req.body.nombre,
    email: req.body.email,
    role: req.body.role,
  }

  body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

  try {
    
    const userDB = await User.create(body);

    res.json(userDB);

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    });
  }

});

//Put Users
router.put('/user/:id', [verificarAuth, verificaRol], async (req, res) => {
  let _id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'pass', 'activo']);

  if (body.pass) {
    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
  }

  try {
    const usuarioDB = await User.findByIdAndUpdate(_id, body, {new: true, runValidators: true});

    return res.json(usuarioDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

module.exports = router;
