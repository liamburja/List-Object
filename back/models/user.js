import mongoose from 'mongoose';

const uniqueValidator = require('mongoose-unique-validator')

//Roles

const roles = {
  values: ['ADMIN'],
  message: '{VALUE} no es un rol valido'
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombres es necesario'] },
  email: { type: String, unique: true, required: [true, 'Email necesario'] },
  pass: { type: String, required: [true, 'Password necesaria'] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'ADMIN', enum: roles },
  activo: { type: Boolean, default: true },
})

//Validator

userSchema.plugin(uniqueValidator, { message: 'Error, se espetaba {PATH} único.' });


userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.pass;
  return obj;
}


//Convertimos a modelo

const User = mongoose.model('User', userSchema);

export default User;
