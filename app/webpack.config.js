module.exports = {
    entry: './components/App.jsx',
    output: {
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony' },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file" },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}
