Projet 7 de la formation de développeur web chez OpenClassRooms Création d'un réseau social pour l'entreprise Groupomania.
Version 1 de développement permettant un test par un employé du groupe.

## Développement du Projet :
Backend : NodeJS + express + sequelize Base de données : MySQL ;

Backend_Package : (bcrypt, body-parser, crypto-js,dotenv, express , jsonwebtoken, multer ,nodemon)

Frontend : VueJS3 + vue-cli + Vuex , bootstrap ;

Frontend_Package : (axios , moment , vue-router , Vuex)
## Back-end :

npm install

puis serveur nodemon

## Frontend :

Depuis le terminal de l'éditeur de code, se rendre sur le dossier "frontend" et exécuter la commande :

npm install

puis npm run serve 

Ouvrir ensuite votre navigateur et accéder à : http://localhost:8080/

## Base de données :

Se connecter à un serveur MySQL et créer une base de donnée Ex : 'CREATE DATABASE nomDeLaBase'

Importer  le fichier database_groupmania.sql situé dans Backend/db/ dans la base de donnée

Ex : mysql -u root -p nomDeLaBase < chemin_vers_le_fichier_database_groupmania.sql

NB : Veuillez indiquer ci dessus le chemin complet vers le fichier database_groupmania.sql selon l'endroit ou vous l'aurez sauvegardé