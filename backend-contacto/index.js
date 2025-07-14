const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contacto', async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;

  // Configura el transporte con tu cuenta de Gmail y contraseña de aplicación
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fercortez120@gmail.com', // Cambia por tu correo de envío
      pass: 'wxza ojfa qrvb ryca' // Contraseña de aplicación de Gmail
    }
  });

  try {
    await transporter.sendMail({
      from: `"${nombre}" <${email}>`,
      to: 'direccion@thefuentescorp.com.mx', // Correo de la empresa
      subject: asunto || 'Nuevo mensaje de contacto',
      text: `
        Nombre: ${nombre}
        Email: ${email}
        Teléfono: ${telefono}
        Mensaje: ${mensaje}
      `,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Mensaje:</strong><br>${mensaje}</p>
      `
    });
    res.json({ ok: true, message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error al enviar el mensaje' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor de contacto escuchando en http://localhost:${PORT}`);
});