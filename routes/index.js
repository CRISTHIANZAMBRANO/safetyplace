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
  try{
  const objetovul = await vul.findById(id);
  res.render('edit',{
    objetovul
  });
}catch(e){
  res.send('error');
}
});
router.get('/principal', async function(req, res, next) {
  res.render('dashboard_principal',{iden:undefined,nombre:undefined});
  
});
module.exports = router;
