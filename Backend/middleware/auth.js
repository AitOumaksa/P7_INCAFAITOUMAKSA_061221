// Imports
const jwt = require('jsonwebtoken');

// Exportation de la fonction d'authentification
module.exports = (req, res, next) => {
    // Récupération du token dans les paramètres
    const authHeader = req.headers.authorization;
 
    // Si l'utilisateur possède une autorisation,
    // on déclare le token et on le vérifie, s'il n'y a pas
    // d'erreur, on le next, sinon on renvoie un statut 401
    if (authHeader) {
        const token = authHeader.split(' ')[1];
       console.log('authHeader',authHeader)
        jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
            if (err) { console.log('err',authHeader)
                 res.status(401).json({error: err})
                 return
            }
            console.log('ok',authHeader)
            next();
        });
    }
    // Sinon, on renvoie le statut 401 Unauthorized
    else { console.log('accès non authorisé',authHeader)
        res.status(401).json({error:"accès non authorisé"});
    }
};