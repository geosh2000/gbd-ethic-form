const path = require('path');

module.exports = {
  entry: './src/index.js', // Archivo de entrada principal
  output: {
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    filename: 'bundle.js', // Archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Procesa archivos .js y .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Transpila JSX y JS moderno
          },
        },
      },
      {
        test: /\.css$/, // Procesa archivos .css
        use: [
          'style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Permite importar archivos sin poner la extensión
  },
  devServer: {
    static: './dist', // Carpeta para el servidor de desarrollo
  },
};