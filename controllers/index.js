"use strict";

module.exports = (app) => {
  app.post("/api/test", async (req, res, next) => {
    try {
      res.json({ foo: "bar" });
    } catch (err) {
      next(err);
    }
  });
};
