/* globals describe, expect, it, before */

/**
 * Singularkey Unit Tests
 */
const { expect } = require("chai");
const sinon = require("sinon");
const { logger } = require("@skinternal/skconnectorsdk");
const api = require("../api");
const { sdkInitializeTest } = require("./sdkInitializeTest.js");

const { handle_capability_postHTTP } = require("../index");

const props = require("./data/properties");

sdkInitializeTest();

describe("Unit Tests", () => {
  it("happy path", async () => {
    const stub1 = sinon
      .stub(api, "postHTTP")
      .returns({ data: { prop: "value" } });

    handle_capability_postHTTP(props.data).then(
      (res) => {
        logger.info(`res is: ${JSON.stringify(res)}`);
        expect(res).to.be.an("object");
        expect(res.output).to.be.an("object");
        expect(res.output.rawResponse).to.be.an("object");
        expect(res.output.rawResponse).to.have.property("prop");
        stub1.restore();
      },
      (err) => {
        console.log(`error is: ${err}`);
        stub1.restore();
      }
    );
  });

  it("handle missing url", async () => {
    handle_capability_postHTTP(props.badData).then(
      (response) => {
        console.log(`response is ${response}`);
        expect(response).to.not.exist;
      },
      (error) => {
        console.log(`error is: ${JSON.stringify(error)}`);
        expect(error.code).to.be.a("string");
      }
    );
  });
});
