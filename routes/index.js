var express = require('express');
var router = express.Router();
var novedadesModel = require("./../models/novedadesModel");
var cloudinary = require("cloudinary").v2;


/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades();
   novedades = novedades.splice(0,5);//Seleccionamos los primeros 5 elementos del array

   novedades = novedades.map(novedad =>{
     if (novedad.img_id){
       const imagen = cloudinary.url(novedad.img_id,{
         width: 400,
         crop: "fill"
       });
       return{
         ...novedad,
         imagen
       }
     }else{
       return{
         ...novedad,
         imagen: "/images/noimage.jpg"
       }
     }
   })

  res.render('index', { 
    novedades 
  });
});

router.post("/", async (req,res,next) =>{
  
    var name = req.body.name;
    var email = req.body.email;
    var tel = req.body.tel;
    var message = req.body.message;
  
    console.log(req.body);
  
   let obj = {
      to: "leoebahaomde@gmail.com",
      subject: "contacto desde la web",
      html:"<b>"+ name +"</b> se contacto, y dejo el siguinte mensaje: <b>" 
          + message + "</b> para contactarse, dejo su correo electronico: <b>"
          + email + "</b> y su telefono <b>" + tel + "</b>."
   }
  
   var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  
  
  
  let info = await transporter.sendMail(obj)
  
  res.render("contact.hbs",{
    mensaje: "mensaje enviado con exito"
  }) 
  
  })



module.exports = router;
