const sdk = require('@skinternal/skconnectorsdk')
const {serr, compileErr, logger} = require('@skinternal/skconnectorsdk')
const redisList = 'exampleConnector'
const api = require('./api')

/**
 * Initialize is the main function to start this service. It initializes sdk with name of the connector.
 */
const initialize = async () =>{
  try {
    const response = await sdk.initalize(redisList)
    console.log(response)
    logger.info('Started connector-example');
  } catch(err){
    console.log(err);
    logger.error('Error starting connector-example');
  }
}

sdk.methods.handle_capability_postHTTP = async ({properties}) => {
  logger.info('overriding handle_capability_postHTTP');
  try {  
    console.log(properties);
    const {url, body} = properties;

    const response = await api.postHTTP(url, body);

    return {
      output: {
        rawResponse: response.data,
        statusCode: response.status
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
}

initialize();
