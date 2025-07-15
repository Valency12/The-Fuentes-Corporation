// Backend básico para contacto
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Permite peticiones desde otros orígenes

app.post('/api/contact', async (req, res) => {
  const { nombre, apellido, telefono, correo, asunto, mensaje } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia si usas otro servicio
    auth: {
      user: 'direccion@thefuentescorp.com.mx', // Cambia por tu correo real
      pass: 'TU_CONTRASEÑA' // Cambia por tu contraseña real o usa variables de entorno
    }
  });

  let mailOptions = {
    from: correo,
    to: 'direccion@thefuentescorp.com.mx',
    subject: `Contacto Web: ${asunto}`,
    text: `
      Nombre: ${nombre} ${apellido}
      Teléfono: ${telefono}
      Correo: ${correo}
      Mensaje: ${mensaje}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ ok: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al enviar el mensaje', error });
  }
});

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001')); 