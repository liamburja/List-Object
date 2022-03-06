// import mongoose, { mongo } from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ascensorSchema = new Schema({
  direccion: String,
  poblacion: String,
  contrato: String,
  situacion: String,
  firmado: String,
  caducidad: String,
  duracion: String,
  precio: Number,
  contacto: String,
  telefono: Number,
  correo: String,
  notas_adicionales: String,
  observaciones: String,
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default:true},
  usuarioId: String,
})

const Ascensor = mongoose.model('Ascensor', ascensorSchema);

module.exports = Ascensor;
