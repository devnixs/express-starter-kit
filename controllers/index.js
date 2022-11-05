"use strict";

module.exports = (app) => {
  app.post("/api/identity", async (req, res, next) => {
    try {
      res.json({ character: req.session.character });
    } catch (err) {
      next(err);
    }
  });
};
