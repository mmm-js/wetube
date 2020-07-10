const path = require("path"); // = import path from "path";

// __dirname : 현재 프로젝트 디렉토리 명 어디서든 접근 가능한 Node.js전역 변수
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // entry파일의 경로룰 쭉 적어준다
const OUTPUT_DIR = path.join(__dirname, "static"); // static폴더로 export

const config = {
  entry: ENTRY_FILE,
  output: {
    // output은 object여야 한다
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

// = export default config;
module.exports = config;
