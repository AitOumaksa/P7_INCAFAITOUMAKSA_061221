//Import
const models = require('../models');
const utils = require('../utils/jwtUtils');
const dbUtils = require('../utils/dbUtils');
const fs = require('fs');

//Création d'un post
exports.createPost = async (req, res) => {
    
    const userId = utils.getUserId(req.headers.authorization);
    
    console.log(userId )
	let imageUrl;
	try {
		const user = await models.User.findOne({
			attributes: [ 'firstName','lastName', 'id', 'profile_picture' ],
			where: { id: userId }
		});
		console.log('user',user)
       // console.log('file',req.file)
		if (user !== null) {
			if (req.file) { console.log("imgurl",imageUrl)
            
				imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                
			} 
            
			const post =  models.Post.create({
				include: [
					{
						model: models.User,
						attributes: [ 'firstName','lastName', 'id', 'profile_picture' ]
					}
				],
				message: req.body.message || '',
				link: req.body.link || '',
				imageUrl: imageUrl || '',
				UserId: user.id
			})
            .then( (response) => {
			    dbUtils.getPostInfo(response.id)
				.then((repu)=>res.status(200).send( {"post" : repu , "messageRetour": "Votre post est en ligne"}))
			  

			})
            .catch( error => {res.status(500).send({ error: error });});

			
		} else {
			res.status(400).send({ error: error });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};

//récupere les post d'un user 
exports.getUserPost = async (req, res) => {
	try {
	    const userId = utils.getUserId(req.headers.authorization);
		const post =  models.Post.findAll({
			// on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
			where: { userId: userId},
			order: [  ['updatedAt', 'DESC'],	 
			[models.comment , 'updatedAt', 'DESC'],
		    ],
			attributes: [ 'id', 'message', 'imageUrl', 'link', 'updatedAt' ],
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
		.then((response)=>{ res.status(200).json(response);})
	    .catch( error => {res.status(500).send({ error: error });});
		
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};

//récupere tt les posts
exports.getAllPosts = async (req, res) => {
	try {
		const posts = await models.Post.findAll({
			attributes: [ 'id', 'message', 'imageUrl', 'link', 'updatedAt' , 'createdAt' ],
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
					attributes: [ 'UserId' ]
				},
				{
					model: models.Dislike,
					attributes: ['UserId' ]
				},
				{
					model: models.comment,
					attributes: [ 'message', 	'id' , 'updatedAt','createdAt', 'UserId','PostId' ],
					include: [
						{
							model: models.User,
							attributes: [ 'profile_picture', 'lastName','firstName','id' ]
						}
					]
				}
			]
		})
		.then((response)=>{ res.status(200).json(response);})
	    .catch( error => {res.status(500).send({ error: error });});
		
		
	} catch (error) {
		return res.status(500).send({
			error: 'Une erreur est survenue lors du chargement des posts '
		});
	}
};
//modifier un post
exports.updatePost = async (req, res) => {
	try {
		let newImageUrl;
		const userId = utils.getUserId(req.headers.authorization);
		console.log(userId);
		let post = await models.Post.findOne({ where: { id: req.params.id} });
		if (userId === post.UserId) {
			if (req.file) {
				newImageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
				console.log(newImageUrl);
				if (post.imageUrl) {
					const filename = post.imageUrl.split('/images')[1];
					fs.unlink(`images/${filename}`, (err) => {
						if (err) console.log(err);
						else {
							console.log(`Deleted file: images/${filename}`);
						}
					});
				}
			}
			if(!req.file && req.body.deleteImage =="true")
			{
				newImageUrl = '';
				if (post.imageUrl) {
					const filename = post.imageUrl.split('/images')[1];
					fs.unlink(`images/${filename}`, (err) => {
						if (err) console.log(err);
						else {
							console.log(`Deleted file: images/${filename}`);
						}
					});
				}
			}
			post.message = req.body.message;
			
			post.link = req.body.link;
			post.imageUrl = newImageUrl;
			const newPost = await post.update({
				fields: [ 'message', 'link', 'imageUrl' ]
			})
			.then( (response) => { post.save()

			    .then( ()=> dbUtils.getPostInfo(response.id)
				        .then((repu)=>res.status(200).send( {"post" : repu , "messageRetour": "post modifié"}))
			     )
			})
            .catch( error => {res.status(500).send({ error: error });});
			
		} else {
			res.status(400).json({ message: "Vous n'avez pas les droits pour modifier ce post" });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};


//suprimer un post
exports.deletePost = async (req, res) => {
	try {
		const userId =  utils.getUserId(req.headers.authorization);
		const checkAdmin = await models.User.findOne({ where: { id: userId } });
		const post = await models.Post.findOne({ where: { id: req.params.id } });
		if (userId === post.UserId || checkAdmin.isAdmin === true) {
			if (post.imageUrl) {
				const filename = post.imageUrl.split('/images')[1];
				fs.unlink(`images/${filename}`, () => {	
				});
			} 
            models.Post.destroy({ where: { id: post.id } })
			.then(()=> res.status(200).json({ message: 'Post supprimé' }))
			.catch((error)=> res.status(500).json({ error : error }))
		    

		} else {
			res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce post" });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};



//liker un post
exports.likePost = async (req, res, next) => {
	try {
		const userId = utils.getUserId(req.headers.authorization);
		const postId = req.params.id;
		const user = await models.Like.findOne({
			where: { UserId: userId, PostId: postId }
		});
		if (user) {
			await models.Like.destroy(
				{ where: { UserId: userId, PostId: postId } },
				{ truncate: true, restartIdentity: true }
			);
			res.status(200).send({ messageRetour: "Neutre" });
		} else {
			await models.Like.create({
				UserId: userId,
				PostId: postId
			});
			res.status(201).json({ messageRetour: 'vous aimez ce post' });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};

//disliker un post
exports.dislikePost = async (req, res, next) => {
	try {
		const userId = utils.getUserId(req.headers.authorization);
		const postId = req.params.id;
		const user = await models.Dislike.findOne({
			where: { UserId: userId, PostId: postId }
		});
		if (user) {
			await models.Dislike.destroy(
				{ where: { UserId: userId, PostId: postId } },
				{ truncate: true, restartIdentity: true }
			);
			res.status(200).send({ messageRetour: "Neutre" });
		} else {
			await models.Dislike.create({
				UserId: userId,
				PostId: postId
			});
			res.status(201).json({ messageRetour: 'vous n\'aimez pas ce post' });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};

//ajouter un commentaire
exports.addComment = async (req, res) => {
	try { 
		const comment = req.body.commentmessage;
		const newComment = await models.comment.create({
			message: comment,
			UserId: utils.getUserId(req.headers.authorization),
			PostId: req.params.id
		})
		.then( (response) => {
			dbUtils.getCommentInfo(response.id)
			.then((repu)=>res.status(200).send( {"newComment" : repu ,"postid" : req.params.id ,"messageRetour": "votre commentaire est publié"}))
		  

		})
		.catch( error => {res.status(400).send({ error: error });});
		
		
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};

//modifier un commentaire 
exports.updateComment = async (req, res) => {
try{
const userId = utils.getUserId(req.headers.authorization);
let comments = await models.comment.findOne({ where: { id: req.params.id} });
if (userId === comments.UserId) {
if (req.body.commentmessage){ 
comments.message = req.body.commentmessage;
}
comments.save()
.then(
	  (response)=> {
		dbUtils.getCommentInfo(response.id)
		.then((repu)=>res.status(200).send( {"updateComment" : repu, "messageRetour": "votre commentaire est modifié"}))
	  })
	
.catch( ()=> res.status(500).send({ error: 'Erreur du serveur de BDD' }))




}else{
	res.status(400).json({ messageRetour: "Vous n'avez pas les droits pour modifier ce commentaire" });
}
}catch(error){
	return res.status(500).send({ error: 'Erreur du serveur' });
}

};
//suprimer un commentaire 
exports.deleteComment = async (req, res) => {
	try {
		const userId =  utils.getUserId(req.headers.authorization);
		const checkAdmin = await models.User.findOne({ where: { id: userId } });
		const comment = await models.comment.findOne({ where: { id: req.params.id } });

		if (userId === comment.UserId || checkAdmin.isAdmin === true) {
			models.comment.destroy({ where: { id: req.params.id } }, { truncate: true })
			.then(()=>{ res.status(200).json({message: 'commentaire supprimé'});})
	        .catch( error => {res.status(500).send({ error: error });});
			 
		} else {
			res.status(400).json({ message: "Vous n'avez pas les droits pour supprimer ce commentaire" });
		}
	} catch (error) {
		return res.status(500).send({ error: 'Erreur du serveur' });
	}
};