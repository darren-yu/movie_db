"use strict";

module.exports = function(sequelize, DataTypes) {
  var watch_list = sequelize.define("watch_list", {
    // title: DataTypes.STRING,
    title_name: DataTypes.STRING,
    year: DataTypes.STRING,
    imdb_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return watch_list;
};
