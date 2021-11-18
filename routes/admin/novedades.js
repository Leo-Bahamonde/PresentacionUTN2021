var express = require('express');
var router = express.Router();
var novedadesModel = require ("./../../models/novedadesModel")

/* GET users listing. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades()

  res.render('admin/novedades',{
    layout: "admin/layout",
    usuario: req.session.nombre,
    novedades
  });
});

/* Para eliminar una novedad*/

router.get ("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect("/admin/novedades")
})


/* Para agregar una novedad*/
router.get("/agregar",(req,res,next)=>{
  res.render("admin/agregar",{
    layout: "admin/layout"
  })
})

router.post("/agregar", async (req, res, next) => {
  try{
      if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo !="") {
        await novedadesModel.insertNovedades(req.body);
        res.redirect("/admin/novedades")
      } else {
        res.render("admin/agregar",{
          layout: "admin/layout",
          error:true,
          message: "Todos los campos son requeridos"
        })
      }
  } catch (error){
      console.log(error);
      res.render("admin/agregar",{
        layout: "admin/layout",
        error:true,
        message: "No se pudo cargar las novedades"
      })
  }
})

router.get("/modificar:/id", async (req,res,next)=>{
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadById(id);
  res.render("admin/modificar",{
    layout: "admin/layout",
    novedad
  })
})




module.exports = router;