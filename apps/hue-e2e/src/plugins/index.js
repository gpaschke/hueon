// ***********************************************************
// Used to load plugins
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const { getWebpackConfig } = require('@nrwl/cypress/plugins/preprocessor');
const preprocessor = require('@cypress/webpack-preprocessor');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

// This function is called when a project is opened or re-opened
module.exports = (on, config) => {
  // Process Cucumber (.feature) files
  const wpConfig = getWebpackConfig(config);
  wpConfig.node = {fs: 'empty', child_process: 'empty', readline: 'empty'};
  wpConfig.module.rules.push({
    test: /\.feature$/,
    loader: 'cypress-cucumber-preprocessor/loader',
    exclude: [ /node_modules/ ],
    options: {
      configFile: 'tsconfig.e2e.json',
      experimentalWatchApi: true,
      transpileOnly: true
    }
  });

  // Preprocess Typescript files
  on('file:preprocessor', preprocessor({webpackOptions: wpConfig}));

  // Generate allure test reports
  allureWriter(on, config);

  // Visual Regression (2)
  addMatchImageSnapshotPlugin(on, config);
};
