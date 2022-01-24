const sdk = require('@skinternal/skconnectorsdk');
const { serr, compileErr, logger } = require('@skinternal/skconnectorsdk');
const { get } = require('lodash');
const connectorManifest = require('./manifests/manifest');

const redisList = 'exampleConnector';
const api = require('./api');

/**
 * Performs the necessary processing to initialize the connector
 *
 */
const initialize = async () => {
  try {
    // Update Manifest
    if (get(process, 'argv[2]', null) === 'mode=update-manifest') {
      await sdk.manifestDeploy(connectorManifest);
      process.exit(0);
    }
    // The real thing of note here: registers the connector with the SDK and subscribes to REDIS changes
    const response = await sdk.initalize(redisList);
    // console.log(response);
    logger.info('Started connector-example:', response);
  } catch (err) {
    logger.error('Error starting connector-example');
    logger.error(err);
    process.exit(1);
  }
};

/**
 * This method performs the necessary processing for the
 * postHTTP capability for this example connector.
 * Note that the naming is important
 * @param {*} param0
 * @returns
 */
const handle_capability_postHTTP = async ({ properties }) => {
  logger.info('overriding handle_capability_postHTTP');
  try {
    console.log(properties);
    const { url, body } = properties;

    const response = await api.postHTTP(url, body);

    return {
      output: {
        rawResponse: response.data,
        statusCode: response.status,
      },
      eventName: 'continue',
    };
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return {
        output: {
          rawResponse: {},
        },
        eventName: 'continue',
      };
    }
    throw compileErr('postHTTP', err);
  }
};

sdk.methods.handle_capability_postHTTP = handle_capability_postHTTP;

initialize();

module.exports = {
  handle_capability_postHTTP,
};
