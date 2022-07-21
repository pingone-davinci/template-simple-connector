/* eslint-disable new-cap */
const sdk = require('@skinternal/skconnectorsdk');
const { serr:sdkSerr, logger } = require('@skinternal/skconnectorsdk');
const { get } = require('lodash');

const connectorManifest = require('./manifest/manifest');

const redisList = 'connectorOpenweather';
const api = require('./api')

const initializeHTTPClient = async (setAxios, companyId) => {
  setAxios(sdk.httpClient.initialize({}, {companyId}));
}

const initialize = async () => {
  try {
    // Update Manifest
    if (get(process, 'argv[2]', null) === 'mode=update-manifest') {
      await sdk.manifestDeploy(connectorManifest);
      return;
    }
    // The real thing of note here: registers the connector with the SDK and subscribes to REDIS changes
    const response = await sdk.initalize(redisList);
    logger.info('Started connector-openweather:', response);
  } catch (err) {
    logger.error('Error starting connector-openweather');
    logger.error(err);
  }
};

const handle_capability_getWeather = async ({ properties, companyId, serr }) => {
  logger.info('overriding handle_capability_getWeather');

  try {
    // This initialize the httpClient object and required for any http calls 
    await initializeHTTPClient(api.setAxios, companyId);

    // These input properties are declared from any account config view properties you defined
    // Please make sure these don't conflict with variables defined from the flow config view on the following lines
    // If they do then you probably declared that the property was going to be used in both the account config 
    // view AND the flow config view
    const {appid, lat, lon, units} = properties;

    // Call the getWeather API
    const response = await api.doAxiosRequest(() => api.getWeather({
      appid,
      lat,
      lon,
      units}), 'getWeatherResponseError', 'getWeather API error', serr);

    return {
      output: {
        rawResponse: response.data,
        statusCode: response.status,
        headers: response.headers,
        lat: response.data.lat,
        lon: response.data.lon,
        current: {
          dt: response.data.current.dt,
          temp: response.data.current.temp,
          feelsLike: response.data.current.feels_like
        }
      },
      eventName: 'continue',
    };
  // Deal with errors.  'serr'(imported as 'sdkSerr') is the expected error type from Davinci
  } catch (err) {
    if (err instanceof sdkSerr) {
      throw err;
    }

    // If we get here something went wrong not related to the API request
    logger.error(`getWeather error: ${err}`);
    throw new serr('getWeatherError', {
      message: 'Something went wrong.'
    });
  }
};


// Map the function defined above to the Davinci SDK methods defined in the manifest.js capabilities section
sdk.methods.handle_capability_getWeather = handle_capability_getWeather;

initialize();

module.exports = {
  handle_capability_getWeather,
};
