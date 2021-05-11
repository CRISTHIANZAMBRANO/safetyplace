var express = require('express');
var router = express.Router();
require('../ctrl/mongo');
const vul= require('../model/vul');
const usr= require('../model/usr');
const session=require('express-session');

router.post('/add',async function(req,res,next){
  console.log(req.body)
    const vulne=new vul(req.body);
    try{
      const prueba=await vulne.save();
      res.json(prueba);
     }catch(e){
      res.send('error')
     }
    
  });
  router.get('/delete/:id', async function(req, res){
    const { id }= req.params;
    try{
    await vul.remove({_id: id});
    res.redirect('/principal');
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
  router.post('/validar', function(req,res){
    
    usr
   .findOne({email:req.body.correo, contraseña:req.body.clave})
   .then(data => {
    
    if(data){
      req.session.idusr = data._id;
      req.session.nombre=data.nombre;
      res.redirect("/principal")
      
      
    }
    else{
      res.render("login",{respuesta:false})
    }
   })
   .catch(e =>{
     console.log(e)
     res.send("error");
   })
   
   
 });
 router.get('/objeto/:id',async function(req,res){
   try{
    ///const { id }= req.params;
    const muestra = await vul.find();
    res.status(201).json(muestra)
   }catch(e){
     res.status(404)
   }
   
 });
 router.post('/buscar',async function(req,res){
  vul
  .find({vulnerabilidad:req.body.buscar})
  .then(data => {
    if(data){
      try{
        const h=Array.from(data)
        console.log(h[0].vulnerabilidad)
        res.render("resultado",{h})

      }catch(e){
        res.sendStatus(404)
      }
    }
    else{
      res.sendStatus(404)
    }

  })
   
 
 });
  module.exports=router;