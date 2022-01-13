'use strict';
const {
  Model
} = require('sequelize');
/*module.exports = (sequelize, DataTypes) => {
 class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   /* static associate(models) {
      // define association here
      models.Post.belongsTo(models.User,{
        foreignKey: {
          allowNull: false
        }
      })
    }
  };*/
  /*Post.init({
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    link: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;*/


  
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    link: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        models.Post.belongsTo(models.User,{
          foreignKey: {
            allowNull: false
          },
          onDelete: 'CASCADE'
        }),
        
				models.Post.hasMany(models.comment);
        models.Post.hasMany(models.Like);
        models.Post.hasMany(models.Dislike);
      }
    }
  });
  return Post;
};