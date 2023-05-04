const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
    const { username, secret, email, first_name, last_name } = req.body;
  
    try {
      const r = await axios.post(
        "https://api.chatengine.io/users/",
        { username, secret, email, first_name, last_name },
        { headers: { "Private-Key": `${import.meta.env.VITE_PRIVATE_KEY}` } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });

  app.post("/login", async (req, res) => {
    const { username, secret } = req.body;
  
    try {
      const r = await axios.get("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": {`${import.meta.env.VITE_PROJECT_ID}`},
          "User-Name": username,
          "User-Secret": secret,
        },
      });
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });

app.listen(3001);