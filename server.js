"use strict";
const path = require("path");
const express = require("express");
const winston = require("winston");
const require_all = require("require-all");
require("dotenv").config();
const session = require("express-session");

const __DEV__ = process.env.NODE_ENV == "development";

const { Character, initCharacter } = require("./models/character");

winston.add(
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
      winston.format.colorize({ level: true }),
      winston.format.simple()
    ),
  })
);

const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "idlegame",
    cookie: { httpOnly: true },
  })
);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
app.set("x-powered-by", false);
app.locals.__DEV__ = __DEV__;

app.use(express.static(path.resolve(__dirname, "./static")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (!req.session.characterId) {
    const character = await initCharacter();
    req.session.characterId = character.id;
  }

  next();
});

if (__DEV__) {
  // Better stack traces
  require("longjohn");

  // Request logging
  app.use(require("morgan")("dev"));

  // No cache during dev
  app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
}

// Set the "url" variable to be accessible in all views
app.use(async (req, res, next) => {
  res.locals.url = req.url;
  next();
});

// Register controllers.
// For now we only have one
for (const [name, controller] of Object.entries(
  require_all({ dirname: path.resolve(__dirname, "./controllers") })
)) {
  winston.info(`Registering controller /${name}`);
  const router = express.Router();
  controller(router);
  app.use(
    `/`,
    (req, res, next) => {
      next();
    },
    router
  );
}

app.get("/", (req, res) => {
  res.render("index");
});

// Return the not found page otherwise
app.use((req, res) => {
  res.statusCode = 404;
  res.render("404");
});

// if something fails, return the error page
app.use((err, req, res, next) => {
  winston.error(err.message, { url: req.url, err });
  res.render("500", { err });
  res.statusCode = 500;
  next();
});

process.on("unhandledRejection", (err) => {
  winston.error(err.message, { err });
  throw err;
});

(async () => {
  await new Promise((resolve, reject) =>
    require("http")
      .Server(app)
      .listen(Number(process.env.PORT) || 3000, resolve)
      .on("error", reject)
  );
  winston.info("server is running...");
})();
