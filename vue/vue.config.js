/* tslint:disable */
/* eslint-disable */

'use strict';

require('dotenv').config();
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const config = {};

config.productionSourceMap = process.env.SOURCE_MAP === 'true';
config.pwa = {
  workboxOptions: {
    importWorkboxFrom: 'local',
  },
};

if (process.env.IN_DOCKER !== 'true') {
  config.configureWebpack = () => {
    return {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/about'],
        }),
      ],
    };
  };
}
