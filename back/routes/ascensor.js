const express = require('express');
const router = express.Router();

//Import the ascensor
const Ascensor = require('../models/ascensor');

const {verificarAuth} = require('../middlewares/autentification.js');

//Post Ascensor
router.post('/new-ascensor',verificarAuth, async(req, res) => {
  const body = req.body;

  body.usuarioId = req.usuario._id;

  try {
    const ascensorDB = await Ascensor.create(body);
    res.status(200).json(ascensorDB);
  } catch (error) {
    return res.status(500),json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Get with params
router.get('/ascensor/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const ascensorDB = await Ascensor.findOne({
      _id
    });
    res.json(ascensorDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Get all ascensores
router.get('/ascensor', async(req, res) => {

  try {
    const ascensorDB = await Ascensor.find();
    res.json(ascensorDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//Delete
router.delete('/ascensor/:id', async(req, res) => {
  const _id = req.params.id;

  try {
    const ascensorDB = await Ascensor.findByIdAndDelete({_id});

    if (!ascensorDB) {
      return res.status(400).json({
        mensaje: 'No se ha encontrado el id indicado',
        error
      })
    }
    res.json(ascensorDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
})

//Put
router.put('/ascensor/:id', async(req, res) => {
  const _id = req.params.id;
  const body= req.body;

  try {
    const ascensorDB = await Ascensor.findByIdAndUpdate(
      _id,
      body,
      {new: true}
    );
    res.json(ascensorDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: 'No se ha encontrado el id indicado',
      error
    })
  }
})

module.exports = router;

