var express = require('express');
var router = express.Router();
const vul= require('../model/vul');
const usr= require('../model/usr');
/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('login',{respuesta:undefined});
});
router.get('/registro', function(req, res, next) {
  res.render('registro');
});
router.get('/administrador', async function(req, res, next) {
  const muestra = await vul.find();
  res.render('index',{muestra});
});
router.get('/edit/:id', async function(req, res){
  const { id }= req.params;
  console.log("este es el id: "+id)
  try{
  const objetovul = await vul.findById(id);
  res.render('edit',{
    objetovul
  });
}catch(e){
  res.send('error');
}
});

router.get('/info/:id', async function(req, res){
  const { id }= req.params;
  console.log("este es el id: "+id)
  try{
  const muestra = await vul.findById(id);
  res.render('info',{
    muestra
  });
}catch(e){
  res.send('error');
}
});

router.get('/principal', async function(req, res, next) {
  try{
    console.log(req.session.idusr)
    if(req.session.idusr){
      const muestra = await vul.find({idus:req.session.idusr});
      console.log(muestra)
      res.render('dashboard_principal',{iden:req.session.idusr,nombre:req.session.nombre,muestra});
    }
  else{
    res.redirect("/");
  }
    
    
  }catch(e){
    res.send('error');
  }
  
});
router.get('/pruebita', async function(req, res, next) {
try{
  res.render('inicio');
}
catch(e){
  res.send('error');
}
});
module.exports = router;
