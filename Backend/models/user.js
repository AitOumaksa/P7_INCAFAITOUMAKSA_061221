
'use strict';
const {Model} = require('sequelize');
/*module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*static associate(models) {
      // define association here
    }
  };*/
  /*User.init({
    email: DataTypes.STRING,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    profile_picture: DataTypes.BLOB,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        models.User.hasMany(models.Post);
        models.User.hasMany(models.comment);
			models.User.hasMany(models.Like);
      models.Post.hasMany(models.Dislike);
        
      }
    }
  });
  return User;
};