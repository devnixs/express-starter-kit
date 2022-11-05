const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../database");
const { monsters } = require("./monster");

// Option 1: Passing a connection URI
class Fight extends Model {}

Fight.init(
  {
    // Model attributes are defined here
    /*     Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, */
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monsterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    outcome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    characterHp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monsterHp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // deuxième argument et deuxième objet de init : le lien avec la BDD
    sequelize: sequelize, // la BDD concernée
    tableName: "fight", // la table concernée
    modelName: "Fight",
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
  }
);

const initFight = (character) => {
  const monstersOfThisStage = monsters.filter(
    (i) => i.stage === character.stage
  );
  const monster =
    monstersOfThisStage[Math.floor(Math.random() * monstersOfThisStage.length)];
  console.log("Generated fight with : ", monster);

  const fight = Fight.build({
    characterId: character.id,
    monsterId: monster.id,
    date: new Date(),
    outcome: "in_progress",
    characterHp: character.hitPoints,
    monsterHp: monster.hitPoints,
  });

  fight.save();
  return fight;
};

module.exports = { Fight, initFight };
