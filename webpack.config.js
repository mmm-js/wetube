const path = require("path"); // = import path from "path";
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
// __dirname : 현재 프로젝트 디렉토리 명 어디서든 접근 가능한 Node.js전역 변수
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); // entry파일의 경로룰 쭉 적어준다
const OUTPUT_DIR = path.join(__dirname, "static"); // static폴더로 export

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  // module을 발견할 떄마다 rules를 따르도록 하고 있다
  module: {
    /* rules is Object
     * test : 정규식을 사용하여 파일을 찾는다
     * use : 어떤 plugin들을 사용함, 어떤 처리를 하는지
     */
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        // .scss로 끝나는 어떤 module을 만나게 되면 ,
        // ExtractCSS.extract()이 plugin을 사용하도록 하고있다.
        test: /\.(scss)$/,
        //(중요)처리 순서는 아래부터 위로.
        //아래 loader들을 통해서 잘 호환되는 순수한 css가 불러와지면,추출하여 아래 plugins설정한 파일명으로 보내준다
        use: ExtractCSS.extract([
          {
            //이 loader는 webpack이 CSS를 이해할 수 있도록 가르쳐준다.
            loader: "css-loader",
          },
          {
            //css 호환성 관련된것을 해결해줌
            loader: "postcss-loader",
            options: {
              plugins() {
                //하나의 plugin으로만 이루어진 array를 리턴해주고 있지만,원하는 만큼 많은 plugin을 추가해줄 수 있다.
                //autoprefixer()또한 많은 옵션들이 있다 옵션을 추가해 주자
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
          },
          {
            //sass-loader는 sass(scss)를 받아서 일반 css로 바꿔줄 수 있다,
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    // output은 object여야 한다
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

// = export default config;ENV;
module.exports = config;
