const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database");
const { Fight, initFight } = require("./fight");
const { monsters } = require("./monster");

// Option 1: Passing a connection URI
class Character extends Model {}

Character.init(
  {
    // Model attributes are defined here
    /*     Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, */
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attackSpeed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hitPoints: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalMonsterKilled: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    highestMonsterKilled: {
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

const initCharacter = async () => {
  const character = Character.build({
    class: "warrior",
    name: "bob",
    level: 1,
    experience: 0,
    strength: 10,
    attackSpeed: 1,
    hitPoints: 100,
    stage: 1,
    totalMonsterKilled: 0,
    highestMonsterKilled: null,
  });

  await character.save();

  await initFight(character);

  return character;
};

module.exports = { Character, initCharacter };
