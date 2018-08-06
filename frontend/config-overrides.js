/* config-overrides.js */

const rewireBundleAnalyzer = require('react-app-rewire-bundle-analyzer');
 
module.exports = function override(config, env) {
    // ...
    // use the Preact rewire
    config = rewireBundleAnalyzer(config, env);
    // ...
    return config;
}