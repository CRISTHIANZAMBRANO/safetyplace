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
    idus:String
    
});

 module.exports= mongoose.model('vulnerability',VulSchema);