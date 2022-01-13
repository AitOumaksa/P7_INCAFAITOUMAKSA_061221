
//Importation du package multer qui nous permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image.gif": "gif",
    "image.webp": "webp",
  }

//Gestion des fichiers entrants dans les requêtes HTTP 
const storage = multer.diskStorage({
  
    destination: (req, file, callback) => {
      
      callback(null, 'images');
    },
    // nouveau nom du fichier image pour éviter les doublons
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
   
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
    }
  });
  
  
  
  module.exports = multer({storage: storage}).single('image');