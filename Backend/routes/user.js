const express = require('express');
const router = express.Router();
//chemin vers le fichier sauce qui ce trouve dans le repertoire controllers (contient tt la logique metier des routes user)
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//Routage
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.put('/update',auth,multer, userCtrl.updateAccount);
router.put('/updateMdp',auth, userCtrl.changePwd);
router.delete('/deletePic', auth, userCtrl.deleteProfilePic);
router.delete('/delete', auth, userCtrl.deleteProfile);


module.exports = router;