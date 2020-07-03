import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

const PORT = 4000;
const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello");

const handleProfile = (req, res) => res.send("you! hi");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); //보안에 도움이 됨
app.use(morgan("dev")); //logging

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
