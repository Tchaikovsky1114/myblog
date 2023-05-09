const path = require('path');

module.exports = {
  entry: {
    todolist:'./public/javascripts/todolist.js',
    editor:'./public/javascripts/editor.js',
    quill: './public/javascripts/quill.js'
  }, // 번들링할 파일의 진입점을 설정합니다
  mode: 'development',
  resolve: {

    extensions: ['.js'],
    // fallback: {
    //   util: require.resolve('util/'),
    //   stream: require.resolve('stream-browserify'),
    //   buffer: require.resolve('buffer/'),
    //   path: require.resolve('path-browserify'),
    // },
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts/dist'), // 번들링된 파일의 출력 경로를 설정합니다
    filename: '[name].bundle.js' // 번들링된 파일의 이름을 설정합니다
  },
  module: {
    rules: [
      {
        test: /\.js$/, // .js 확장자를 가진 파일에 대해서
        exclude: /node_modules/, // node_modules 디렉토리를 제외하고
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }, // babel-loader를 사용하여 ES6+ 문법을 변환합니다
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  watch: true,
  devtool: 'source-map',// 웹팩의 번들링된 파일을 브라우저에서 디버깅할 때 사용할 소스맵을 설정합니다
  devServer: {
    hot: true // 코드 일부만 변경되었을때에도 리로드를 하지 않고 변경된 부분만 리로드를 하게 해줌
  }
};