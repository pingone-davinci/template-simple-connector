/* globals describe, expect, it, before */

/**
 * Singularkey Unit Tests
 */
const { expect } = require('chai');
const sinon = require('sinon');
const sdk = require('@skinternal/skconnectorsdk');
const api = require('../api');

const { handle_capability_postHTTP } = require('../index');

const props = require('./data/properties');
const { assert } = require('sinon');

before((done) => {
  done();
});

describe('Unit Tests', () => {
  it('happy path', (done) => {
    const stub1 = sinon
      .stub(api, 'postHTTP')
      .returns({ data: { prop: 'value' } });

    handle_capability_postHTTP(props.data)
      .then((res) => {
        console.log(`res is: ${JSON.stringify(res)}`);
        expect(res).to.be.an('object');
        expect(res.output).to.be.an('object');
        expect(res.output.rawResponse).to.be.an('object');
        expect(res.output.rawResponse).should.have.property('prop');
      })
      .finally(() => {
        stub1.restore();
        done();
      });
  });

  it('handle missing url', (done) => {
    handle_capability_postHTTP(props.badData)
      .catch((error) => {
        console.log(`error is: ${JSON.stringify(error)}`);
        expect(error.code).to.be.a('string');
      })
      .finally(() => {
        done();
      });
  });
});
