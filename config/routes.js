const axios = require("axios");
const Users = require("./users-model");
const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: "Sorry. There was an error when registering"
    });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
