const mongoose= require('mongoose');
const { findById } = require('./vul');
const Schema= mongoose.Schema;
let UsrSchema= new Schema({   
    nombre: String,
    email: String,
    contraseña: String   
});

 
 
module.exports= mongoose.model('users',UsrSchema);
