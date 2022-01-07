/* globals describe, expect, it, before */ 

/**
 * Singularkey Unit Tests
 */
const { expect } = require('chai');
const sinon = require('sinon');
const sdk = require('@skinternal/skconnectorsdk');
const api = require('../api');

const { handle_capability_postHTTP } = require('../index');

const { data } = require('./data/properties');

before((done) => {
  done();
});

describe('Unit Tests', () => {
  it('handle_capability_postHTTP', (done) => {
    const stub1 = sinon
      .stub(api, 'postHTTP')
      .returns({ data: { prop: 'value' } });

    const properties = data;
    handle_capability_postHTTP(properties).then((res) => {
      expect(res).to.be.an('object');
      expect(res.output).to.be.an('object');
      expect(res.output.rawResponse).to.be.an('object');
      stub1.restore();
      done();
    });
  });
});
