const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./back/config');
const routes = require('./routes'); 
const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
