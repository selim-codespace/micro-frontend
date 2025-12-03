// Custom webpack configuration that manually sets up Module Federation

const webpack = require('webpack');

module.exports = {
  // Your custom webpack configuration
  plugins: [
    // Add any plugins you need here
    new webpack.DefinePlugin({
      'process.env.NEXT_PRIVATE_LOCAL_WEBPACK': JSON.stringify('true')
    })
  ]
};