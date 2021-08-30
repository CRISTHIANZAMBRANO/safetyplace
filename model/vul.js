const mongoose= require('mongoose');
const Schema= mongoose.Schema;
let VulSchema= new Schema({   
    vulnerabilidad: String,
    tipo_vulnerabilidad: String,
    tecnología:String,
    impacto: String,
    impacto_medido:String,
    usuariosafectados: String,
    contramedida: String,
    tipocolumna:String,
    vez_usada:Number,
    idus:String

},{timestamps:true});

 module.exports= mongoose.model('vulnerability',VulSchema);