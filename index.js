const sdk = require('@skinternal/skconnectorsdk');
const { serr, compileErr, logger } = require('@skinternal/skconnectorsdk');
const { get } = require('lodash');
const connectorManifest = require('./manifests/manifest');

const redisList = 'connectorExample';
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
      return;
    }
    // The real thing of note here: registers the connector with the SDK and subscribes to REDIS changes
    const response = await sdk.initalize(redisList);
    logger.info('Started connector-example:', response);
  } catch (err) {
    logger.error('Error starting connector-example');
    logger.error(err);
  }
};

/**
 * This method performs the necessary processing for the
 * postHTTP capability for this example connector.
 * Note that the naming is important
 * @param {*} inputPayload
 * @returns
 *
 * inputPayload /may/ contain the following properties:
 *   => name: the name of the connector as set in the manifest 'name' top-level key
 *         type: string
 *   => companyId: the ID of the company the connector capability was called from
 *         type: string
 *   => flowId: the ID of the flow executing the connector capability
 *         type: string
 *   => flowVersionId: the version of the flow executing the connector capability
 *         type: number
 *   => connectionId: the ID of the connection (i.e. the instance of the connector with its own configuration settings)
 *         type: string
 *   => connectorId: the ID of the connector (i.e. the connector itself)
 *         type: string
 *   => capabilityName: the name of the capability being called. For this example it would be 'postHTTP'
 *         type: string
 *   => properties: the JSON object containing the properties passed into the capability, think of it as the values configured in the UI for the connection
 *         type: object
 *   => debugMode: whether debug mode is turned on. It is a good idea to leverage this to add increased level of logging in your connector code
 *         type: boolean
 *   => isDisabled: the connector is disabled. You may hadnle this gracefully by treating this as a hint to run the capability code as a dry run.
 *         type: boolean
 *   => respondToUser: 
 *         type: boolean
 *   => inputs: 
 *         type: array
 *   => interactionId: the identifier string for the interaction 
 *         type: string
 *   => connection: redundant information repeating top-level connectionId and connectorId
 *         type: object
 *
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
