//Imports
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');
const cryptojs = require('crypto-js');

module.exports ={
    isAdmin:function(user){
        //A traiter
        return true;
    },
    //recuperation des info user de la bd 
    getPostInfo: async function (postId) {

        try {
            console.log('postId',postId)
           
            const post = await models.Post.findAll({
                // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
                where: { id: postId},
                attributes: [ 'id', 'message', 'imageUrl', 'link', 'updatedAt', 'createdAt' ],
                order: [  ['updatedAt', 'DESC'],	 
                [models.comment , 'updatedAt', 'DESC'],
                ],
                include: [
                    {
                        model: models.User,
                        attributes: [ 'lastName','firstName', 'profile_picture', 'id' ]
                    },
                    {
                        model: models.Like,
                        attributes: [ 'PostId', 'UserId' ]
                    },
                    {
                        model: models.Dislike,
                        attributes: [ 'PostId', 'UserId' ]
                    },
                    {
                        model: models.comment,
                        attributes: [ 'message', 	'id' , 'updatedAt','createdAt', 'UserId','PostId' ],
                        include: [
                            {
                                model: models.User,
                                attributes: [ 'profile_picture', 'lastName','firstName' , 'id'  ]
                            }
                        ]
                    }
                ]
            })
    
            return post;
        
            
        } catch (error) {
            return error;
        }

    },


    getCommentInfo: async function (commentId) {

        try {
            console.log('commentId',commentId)
           
            const post = await models.comment.findAll({
                // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
                where: { id: commentId},
                attributes: [ 'message', 	'id' , 'updatedAt','createdAt', 'UserId','PostId' ],
                order: [ [ 'updatedAt', 'DESC' ] ],
                include: [
                    {
                        model: models.User,
                        attributes: [ 'lastName','firstName', 'profile_picture', 'id' ]
                    },
                ]
            })
    
            return post;
        
            
        } catch (error) {
            return error;
        }

    }
}