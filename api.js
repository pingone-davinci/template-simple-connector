const { logger, serr: sdkSerr } = require('@skinternal/skconnectorsdk');
const _ = require('lodash');

let axios;

// Required for the httpClient object
const setAxios = client => {
    axios = client;
    return axios;
};

// Format serr properties
const apiResponseToSerrProps = (responseBody, responseHeaders, responseStatus, errMessage) => {
  return {
    output: {
      rawResponse: responseBody,
      headers: responseHeaders,
      statusCode: responseStatus,
    },
    details: {
      rawResponse: responseBody,
      headers: responseHeaders,
      statusCode: responseStatus,
    },
    message: errMessage,
  };
};

// Catch error from api calls and throw serr if the axios library throws an error for any non 2xx status codes
// You can also use part of err returned from API call as the errMessage
const doAxiosRequest = async (doRequest, errKey, errMessage, serr = sdkSerr) => {
  try {
    return await doRequest();
  } catch (err) {
    logger.debug(err);

    if (err instanceof sdkSerr) {
      throw err;
    }

    const errData = _.get(err, 'response.data', null) || {};
    const errStatusCode = _.get(err, 'response.status', null);
    const errHeaders = _.get(err, 'response.headers', null);
    throw new serr(errKey, apiResponseToSerrProps(errData, errHeaders, errStatusCode, errMessage));
  }
}

// Define each api method as such
const getWeather = async({appid, lat, lon, units}) => {

  // Create the axios config object
  const config = {
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/onecall', // maybe this comes from one of your input variables
    headers: { 
      'Content-Type': 'application/json',
      'User-Agent': 'PingOne DaVinci'
    },
    params: {
      'lat': Number(lat),
      'lon': Number(lon),
      'exclude': 'hourly,daily,minutely',
      'appid': appid,
      'units': units
    }
    // data: {} is available for sending the body
  }

  // Send the axios request
  return axios.request(config);
}

module.exports = {
  setAxios,
  doAxiosRequest,
  getWeather
}