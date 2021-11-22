var express = require('express');
var router = express.Router();
require('../ctrl/mongo');
const vul = require('../model/vul');
const usr = require('../model/usr');
const session = require('express-session');

router.post('/add', async function (req, res, next) {
  console.log(req.body)
  const vulne = new vul(req.body);
  try {
    const prueba = await vulne.save();
    res.json(prueba);
  } catch (e) {
    res.send('error')
  }

});
router.get('/delete/:id', async function (req, res) {
  const { id } = req.params;
  try {
    await vul.remove({ _id: id });
    res.redirect('/principal');
  } catch (e) {
    res.send('error');
  }
});

router.post('/edit/:id', async function (req, res) {
  const { id } = req.params;
  try {
    await vul.update({ _id: id }, req.body);
    res.redirect('/principal');
  }
  catch (e) {
    res.send('error');
  }
});
router.post('/enviar', async function (req, res, next) {

  const usuario = new usr(req.body);
  console.log(req.body);
  try {
    await usuario.save();
    res.redirect('/');
  } catch (e) {
    res.send('error')

  }


});
router.post('/validar', function (req, res) {

  usr
    .findOne({ email: req.body.correo, contraseña: req.body.clave })
    .then(data => {

      if (data) {
        req.session.idusr = data._id;
        req.session.nombre = data.nombre;
        res.redirect("/inicio")


      }
      else {
        res.render("login", { respuesta: false })
      }
    })
    .catch(e => {
      console.log(e)
      res.send("error");
    })


});
router.get('/objeto/:id', async function (req, res) {
  try {
    ///const { id }= req.params;
    const muestra = await vul.find();
    res.status(201).json(muestra)
  } catch (e) {
    res.status(404)
  }

});
router.post('/buscar', async function (req, res) {
  vul
    .find({ vulnerabilidad: { $regex: new RegExp("^" + req.body.buscar.toLowerCase(), "i") } })
    .then(data => {
      if (data) {
        try {
          const h = Array.from(data)
          console.log(h[0].vulnerabilidad)
          res.render("resultado", { h })

        } catch (e) {
          res.sendStatus(404)
        }
      }
      else {
        res.sendStatus(404)
      }

    })


});
router.post('/validarcolumna', async function (req, res, next) {
  let dataparent = req.body.parentData
  let datachild = req.body.itemData
  vul.findByIdAndUpdate(datachild, { tipocolumna: dataparent },
    function (err, docs) {
      if (err) {
        res.status(500).json({});
      }
      else {
        res.json(docs);
      }
    });
});
router.post('/agregarworkspace', async function (req, res, next) {
  let idvul = req.body.idvul
  let idusu = req.session.idusr;
  vul.findByIdAndUpdate({ _id: idvul }, { $inc: { vez_usada: 1 } }, function (error, update) {
    if (error)
      return res.json(error);
    const counter = JSON.parse(JSON.stringify(update));
    counter.idus = idusu;
    counter.vez_usada = 1;
    delete counter._id;
    delete counter.createdAt;
    delete counter.updatedAt;
    delete counter.__v
    new vul(counter).save().then(function () {
      res.json({ status: true });
    }).catch(function (e) { console.log(e) });



  });
});
module.exports = router;