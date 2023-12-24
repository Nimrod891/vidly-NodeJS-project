const config = require('config')
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

app.use(express.json());
app.use(logger);
app.use(helmet());

//Configuration
//USAGE: In Terminal, export NODE_ENV=development
console.log('Application Name: '+config.get('name'))
console.log('Mail Server: '+config.get('mail.host'))

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}

const genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Action" },
  { id: 3, name: "Drama" },
];
//Getting all genres
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

//Creating a genre
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

//Getting a single genre
app.get("/api/genre/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("Genre ID does not exist");
  res.send(genre);
});
//Updating a genre
app.put("/api/genres/:id", (req, res) => {
  
const genre = genres.find((c) => c.id === parseInt(req.body.id));
  if (!genre) return res.status(404).send("Genre ID does not exist");
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.name = req.body.name;
  res.send(genre);
});
//Deleting a genre
app.delete("api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.body.id));
  if (!genre) return res.status(404).send("Genre ID does not exist");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre){
    const schema={
        name:Joi.string().min(3).required()
    }
    return Joi.validate(genre,scema)
}

// Env variable for port, default = 3000 if port is undefied
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
