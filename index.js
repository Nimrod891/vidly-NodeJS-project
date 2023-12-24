const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Action" },
  { id: 3, name: "Drama" },
];

//Creating a genre


//Getting all genres

//Getting a single genre

//Updating a genre

//Deleting a genre

// Env variable for port, default = 3000 if port is undefied
const port=process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));
