import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//mongod > port=27017
//mongodb://localhost:포트번호/database이름
mongoose.connect(process.env.MONGO_URL, {
  //configuration(환경설정)
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected to DB");
const handleError = (error) =>
  console.log(`👹 Error on DB Connection:${error}`);

db.once("open", handleOpen); //DB연결시 한번 호출
db.on("error", handleError); //error발생시 함수 호출
