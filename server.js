const express = require('express');
const app = express();
const server = app.listen(3000, turnOn);

function turnOn() { // funcion callback
  console.log('servidor encendido');
}

// Desde la carpeta public vamos a servir nuestra pagina web
app.use(express.static('public'));