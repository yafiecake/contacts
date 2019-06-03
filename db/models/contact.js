'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contacts', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contact_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    }
  }, {
  });
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};