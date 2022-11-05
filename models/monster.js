const monsters = [
  {
    id: 1,
    hitPoints: 100,
    stage: 1,
    name: "Bouftou",
    armor: 0,
    xpGained: 2,
    strength: 1,
    attackSpeed: 1,
    drops: [
      {
        itemId: 1,
        dropRate: 0.1,
      },
    ],
  },
  {
    id: 2,
    hitPoints: 50,
    stage: 1,
    name: "Blob",
    armor: 0,
    xpGained: 1,
    strength: 1,
    attackSpeed: 1,
    drops: [
      {
        itemId: 2,
        dropRate: 0.1,
      },
    ],
  },
];

module.exports = {monsters};
