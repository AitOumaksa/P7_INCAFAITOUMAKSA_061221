'use strict';
const {
  Model
} = require('sequelize');
/*module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  /*  static associate(models) {
      // define association here
      // Relation 1 à plusieurs (de model A à model B) clé étrangère définie à A
			models.comment.belongsTo(models.User, {
				foreignKey: {
					allowNull: false
				},
				onDelete: 'CASCADE'
			}),
				models.comment.belongsTo(models.Post, {
					foreignKey: {
						allowNull: false
					},
					onDelete: 'CASCADE'
				});
    }
  };*/
 /* comment.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    message: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};*/
  
'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    message: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      	models.comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false,
          },
          onDelete: 'CASCADE'
        }),
          models.comment.belongsTo(models.Post, {
            foreignKey: {
              allowNull: false,   
            },
            onDelete: 'CASCADE'
          });
        
      }
    }
  });
  return comment;
};