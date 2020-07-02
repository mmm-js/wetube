import "core-js";
import express from "express";
const app = express();

const PORT = 4000;
const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello");

const handleProfile = (req, res) => res.send("you");

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
