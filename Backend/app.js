//Importation de variable d'enverenement et cofigurer
require('dotenv').config();
// Importation d'express => Framework basé sur node.js
const express = require('express');
const app = express();
// Permet d'extraire l'objet JSON des requêtes POST
const bodyParser = require('body-parser');
//importation de module 'path' pour gérer les chemein des fichiers et repértoires 
const path = require('path');
//Importation des routes users 
const userRoutes = require('./routes/user');
//Importation des routes posts 
const postsRoutes = require('./routes/posts');



app.use((req, res, next) => {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Parser les corps des requête + forcer parse d'objets inclus dans d'autres objets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);

app.use('/api/posts', postsRoutes);



module.exports = app;