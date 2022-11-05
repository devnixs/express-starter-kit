const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database");

// Option 1: Passing a connection URI
class Character extends Model {}

Character.init(
  {
    // Model attributes are defined here
    /*     Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, */
    Class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AttackSpeed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HitPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Stage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalMonsterKilled: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    HighestMonsterKilled: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    // deuxième argument et deuxième objet de init : le lien avec la BDD
    sequelize: sequelize, // la BDD concernée
    tableName: "character", // la table concernée
    modelName: "Character",
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);

module.exports = { Character };

