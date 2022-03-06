const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

import User from '../models/user';

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', async(req, res) => {
  
  const body = req.body;

  try {
    const usuarioDB = await User.findOne({ email: body.email });

    if (!usuarioDB) {
      return res.status(400).json({
        mensaje: 'Usuario no encontrado'
      })
    }

    if (!bcrypt.compareSync(body.pass, usuarioDB.pass)) {
      return res.status(400).json({
        mensaje: 'Usuario no encontrado'
      })
    }

    //Generar token
    let token = jwt.sign({
      data: usuarioDB
    }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });


    return res.json({
      usuarioDB,
      token
    })

  } catch (error) {
    return res.status(400).json({
        mensaje: 'Ocurrio un error'
      })
  }

});

module.exports = router;
