var express = require('express');
var router = express.Router();
require('../ctrl/mongo');
const vul= require('../model/vul');
const usr= require('../model/usr');
router.post('/add',async function(req,res,next){

    const vulne=new vul(req.body);
    try{
      await vulne.save();
      res.redirect('/administrador');
     }catch(e){
      res.send('error')
     }
    
  });
  router.get('/delete/:id', async function(req, res){
    const { id }= req.params;
    try{
    await vul.remove({_id: id});
    res.redirect('/administrador');
    }catch(e){
      res.send('error');
    }
  });
 
  router.post('/edit/:id', async function(req,res){
    const { id }= req.params;
    try{
    await vul.update({_id:id},req.body);
    res.redirect('/administrador');}
    catch(e){
      res.send('error');
    }
  });
  router.post('/enviar',async function(req,res,next){

    const usuario=new usr(req.body);
    console.log(req.body);
    try{
      await usuario.save();
      res.redirect('/');
     }catch(e){
      res.send('error')
      
     }
    
    
  });
  router.post('/validar',function(req,res){
    
    usr
   .findOne({email:req.body.correo, contraseña:req.body.clave})
   .then(data => {
    
    if(data){
      console.log("entra");
      
      res.render("dashboard_principal",{iden:data._id,nombre:data['nombre']})
      
      
    }
    else{
      res.render("login",{respuesta:false})
    }
   })
   .catch(e =>{
     res.send("error");
   })
   
 });
  module.exports=router;