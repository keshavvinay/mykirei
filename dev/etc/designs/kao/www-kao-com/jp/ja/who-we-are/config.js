module.exports = {
  sass: {
    src: [
      './_scss/**/*.scss'
    ],
    dest: './component/css/',
    output: 'local.css',  // 出力ファイル名
    autoprefixer: {
      browsers: ["iOS >= 8.0", "android >= 4.1", "ie >= 11"]
    }
  }
};
