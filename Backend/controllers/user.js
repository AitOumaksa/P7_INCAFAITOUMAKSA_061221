//Importaion du package bcrypt pour le hashage du mdp
const bcrypt = require('bcrypt')
//Importation de pchkage 'jsonwebtoken' pour le decodage du token 
const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.User ;
const cryptojs = require('crypto-js');
const utils = require('../utils/jwtUtils');
const verifInput = require('../utils/verifInput')
const fs = require("fs");


//Création d'un user

exports.signup = (req, res) => {
    // Valider les paramètres de la requète
    //crypter l'email
    const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.CRYPTOJS_EMAIL ).toString(cryptojs.enc.Base64);
    let email = req.body.email;
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let password = req.body.password;
    let bio = req.body.bio;
    if (email == null || lastName == null || firstName == null || password == null) {
        res.status(400).json({ error: 'il manque un paramètre' })
       
    }
    
    //TO DO => Vérification des saisies user
    let emailOk = verifInput.validEmail(email);
    console.log(emailOk)
    let mdpOK = verifInput.validPassword(password);
    console.log(mdpOK)
    let firstNameOk = verifInput.validFirstName(firstName);
    console.log(firstNameOk)
    let lastNameOk = verifInput.validFirstName(firstName);
    console.log(lastNameOk)
    if (emailOk == true && mdpOK == true && firstNameOk == true && lastNameOk == true) {
        //Vérification si user n'existe pas déjà
        User.findOne({
            
            attributes: ['email'],
            where: { email: hashedEmail}
        })
        
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, function (error, bcryptPassword) {
                        // Création de l'user
                        const newUser = User.create({
                            email: hashedEmail,
                            firstName:firstName,
                            lastName : lastName ,
                            password: bcryptPassword,
                            bio : bio ,
                            isAdmin: false
                        })
                            .then(newUser => { res.status(201).json({ 'id': newUser.id }) })
                            .catch(error => {
                                res.status(500).json({ error })
                            })
                    })
                }
                else {
                    res.status(409).json({ error: 'Cette utilisateur existe déjà ' })
                }
            })
            .catch(error => { res.status(500).json({ error }) })
    } else {
        res.status(403).json({
            error: "vous devez bien renseingner les champs"
          });
      
    }
};

//Login d'un user
exports.login = (req, res) => {
    //crypter L'email
    const hashedEmail = cryptojs.HmacSHA512(req.body.email, process.env.CRYPTOJS_EMAIL ).toString(cryptojs.enc.Base64);
    //Récupération et validation des paramètres
    let email = req.body.email;
    let password = req.body.password;
    if (email == null  || password == null) {
        res.status(400).json({ error: 'Il manque un paramètre' })
    }
    //Vérification si user existe
    User.findOne({
        where: { email : hashedEmail }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: user.id,
                            token: utils.generateToken(user),
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: 'invalid password' });
                    };
                })
            } else {
                res.status(404).json({ 'error': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(error => { res.status(500).json({ error }) })
};
//récupérer le profil d'utilisateur 
exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    User.findOne({
        attributes: ['id', 'email', 'lastName','firstName','profile_picture','bio','isAdmin'],
        where: { id: id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

  //modification du mdp utilisateur 
exports.changePwd = (req, res) => {
    //TO DO:
    //Récupère l'id de l'user et le nouveau password
    let userId = utils.getUserId(req.headers.authorization);
    const newPassword = req.body.newPassword;
    const password = req.body.password;
    //Vérification regex du nouveau mot de passe
    console.log('admin', verifInput.validPassword(newPassword))
    if (verifInput.validPassword(newPassword) ) {
        //Vérifie qu'il est différent de l'ancien
        console.log("ici le user id",userId)
        User.findOne({
            where: { id: userId }
        })
            .then(user => {
                console.log('user trouvé', user)


                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                    if (!resComparePassword) {
                        res.status(406).json({ error: 'Mot de passe actuel erroné' })
                    } else {

                        bcrypt.compare(newPassword, user.password, (errComparePassword, resComparePassword) => {
                            //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                            if (resComparePassword) {
                                res.status(406).json({ error: 'Vous avez entré le même mot de passe' })
                            } else {
                                bcrypt.hash(newPassword, 10, function (error, bcryptNewPassword) {
                                    User.update(
                                        { password: bcryptNewPassword },
                                        { where: { id: user.id } }
                                    )
                                        .then(() => res.status(201).json({ confirmation: 'mot de passe modifié avec succès' }))
                                        .catch(error => res.status(500).json(error))
                                })
                            }
                        })
                        
                    }
                })
                
              
            })
            .catch(error => res.status(500).json(error))
    } else {
        res.status(406).json({ error: 'mot de passe non valide' })
    }
}

//modifier les infor personnel du user
  exports.updateAccount = async (req, res) => {
    // modifier le profil
    
   
    try {
      let userId = utils.getUserId(req.headers.authorization);
      let newPhoto;
      // on trouve le user
      let user = await User.findOne({ where: { id: userId } });
      if (userId === user.id) {
        if (req.file && user.profile_picture) {
          newPhoto = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
           console.log(newPhoto)
          const filename = user.profile_picture.split('/images')[1];
          fs.unlink(`images/${filename}`, (error) => {
            // s'il y avait déjà une photo de postée on la supprime
            if (error) {
                console.log(error)
            }
            else {
              console.log(`Deleted file: images/${filename}`);
            }
          });
        } else if (req.file) {
          newPhoto = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        if (newPhoto) {
          user.profile_picture = newPhoto;
        }
        if (req.body.bio) {
          user.bio = req.body.bio;
        }
        if (req.body.firstName) {
          user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          user.lastName = req.body.lastName;
        }
        
        // on sauvegarde les changements dans la bdd
        const newUser = await user.save({ fields: [ 'firstName','lastName', 'bio', 'profile_picture' ] });
        res.status(200).json({
          user: newUser,
          messageRetour: 'Votre profil a bien été modifié'
          
        });
      } else {
        res.status(400).json({ messageRetour: "Vous n'avez pas les droits pour modifier ce profil" });
      }
    } catch (error) {
      return res.status(500).send({ error: 'Erreur du serveur' });
    }
  };
  //suprimer photo de profil d'utilisateur 
exports.deleteProfilePic = async (req, res) => {
    //récupération de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    console.log('user',userId)
    let user = await User.findOne({ where: { id: userId } });
    if(userId === user.id){
       const filename = user.profile_picture.split('/images')[1];
       console.log(filename)
       fs.unlink(`images/${filename}`, (error) => {
        user.profile_picture = "";
        user.save()
        .then(() => { res.status(201).json({ confirmation: 'photo suppprimée avec succès' })})
        .catch(error => res.status(500).json(error))
      
         if (error) {
             res.status(500).json(error)
            console.log('')
        
         }

       });
    }

}

//suprimer compte utilisateur
  exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user
    let userId = utils.getUserId(req.headers.authorization);
    if (userId != null) {
        //Recherche sécurité si user existe bien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                   
                    
                            //Suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log('error' ,err))
                      
                }
                else {
                    res.status(401).json({ error: 'Cet user n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
    }
}









  
