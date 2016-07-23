var webpack = require('webpack')

module.exports = {
  entry: './app/index.js',

  output: {
    filename: './public/bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules)/, loader: 'babel', query: { presets: ['react', 'es2015', 'stage-2'] } },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  },

  externals: {
    // don't bundle 'react' or 'react-dom as they are linked in index.html
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    extensions: ['', '.js']
  },

  ecmaFeatures: {
    modules: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"` || '"production"',
      }
    })
  ]
}
