// Obtenemos las dependencias

const mongoose = require('mongoose')
const createError = require('http-errors')
const logger = require('morgan')
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')


//Añadimos base de datos api Express

require('./config/db.config')


// Creamos api Express
  
const app = express()
console.log('Hola desde express')


// Routes

const routes = require('./config/routes')
app.use('/', routes)


// Errores

app.use((req, res, next) => {
  next(createError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
  const data = {};
  data.message = error.message;
  data.errors = error.errors
    ? Object.keys(error.errors).reduce(
        (errors, key) => ({
          ...errors,
          [key]: error.errors[key].message || error.errors[key],
        }),
        {}
      )
    : undefined;

  res.status(error.status).json(data);
});



// Escuchamos la api desde un puerto y podemos visualizar el local host

const port = Number(process.env.PORT || 3002);

app.listen(port, () => {
  console.log(`Ready! Listen on port ${port}`);
});