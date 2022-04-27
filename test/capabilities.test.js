/* eslint-disable no-unused-expressions */
/* eslint-disable global-require */
/* globals describe, expect, it, before, afterEach */

/**
 * PingOne DaVinci Unit Tests
 */

const { expect, assert } = require("chai");
const sinon = require("sinon");

const api = require("../api");
const capabilities = require("../index")

describe('Capabilities Unit Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  const appid = 'eaa16507a7d5779d6b428b0780962120';

  it('getWeather success', async () => {

    const lat = 20.6534;
    const lon = -105.2253;
    const units = 'metric'

    const properties = {appid, lat, lon, units};
    const companyId = '12345';

    const params = {
      properties,
      companyId,
    };
  
    const result = {
      data: {
        "lat": 20.6534,
        "lon": -105.2253,
        "timezone": "America/Mexico_City",
        "timezone_offset": -18000,
        "current": {
            "dt": 1651015029,
            "sunrise": 1650976436,
            "sunset": 1651022587,
            "temp": 26.97,
            "feels_like": 28.41,
            "pressure": 1010,
            "humidity": 65,
            "dew_point": 19.83,
            "uvi": 0,
            "clouds": 0,
            "visibility": 10000,
            "wind_speed": 5.14,
            "wind_deg": 230,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ]
        }
      },
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    sinon.stub(api, 'getWeather')
      .withArgs(sinon.match({ appid, lat, lon, units }))
      .resolves(result);

    return capabilities.handle_capability_getWeather(params)
      .then(({ eventName, output }) => {
        expect(eventName).to.equal('continue');
        expect(output.rawResponse).to.deep.equal(result.data);
        expect(output.statusCode).to.deep.equal(result.status);
        expect(output.headers).to.deep.equal(result.headers);
      });
  })

  it('getWeather expected error', async () => {
    const lat = 20.6534;
    const lon = -100000; // invalid lon
    const units = 'metric'

    const properties = {appid, lat, lon, units};
    const companyId = '12345';

    const params = {
      properties,
      companyId,
    };

    const data = {
      "cod": "400",
      "message": "wrong longitude"
    }

    const error = {
      response: {
        data,
        status: 400,
      }
    }

    let errRes

    sinon.stub(api, 'getWeather')
      .withArgs(sinon.match({ appid, lat, lon, units}))
      .throws(error);

    await capabilities.handle_capability_getWeather(params).catch((err) => {
      errRes = err;
    })

    assert(errRes?.output?.statusCode === 400)
  })

  it('getWeather unexpected error', async () => {
    const lat = 20.6534;
    const lon = -100000; // invalid lon
    const units = 'metric'

    const properties = {appid, lat, lon}; // missing units error
    const companyId = '12345';

    const params = {
      properties,
      companyId,
    };

    const error = 'Undefined'

    let errRes

    sinon.stub(api, 'getWeather')
      .withArgs(sinon.match({ appid, lat, lon, units}))
      .throws(error);

    await capabilities.handle_capability_getWeather(params).catch((err) => {
      errRes = err;
    })

    assert(errRes?.message === 'getWeather error')
  })  
});

