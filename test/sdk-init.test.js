/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* globals describe, expect, it, before, afterEach */ 


/**
 * DaVinci Connector SDK Initialize Tests
 */
 const { expect, use } = require("chai");
 const chaiAsPromised = require("chai-as-promised");
 const sinon = require("sinon");
 const sdk = require("@skinternal/skconnectorsdk");
 const rewire = require("rewire");
 
 use(chaiAsPromised);
 
 describe("SDK Initialize Tests", () => {
   it("initialize: check for error", async () => {
     // stub.restore();
     const sdkStub = sinon.stub(sdk, "initalize").throws("error");
     const init = rewire("../index");
     // eslint-disable-next-line no-underscore-dangle
     const initialize = init.__get__("initialize");
     expect(initialize()).to.eventually.be.fulfilled;
     sdkStub.restore();
   });
   it("Update Manifest", async () => {
     process.argv[2] = "mode=update-manifest";
     const sdkStub = sinon.stub(sdk, "manifestDeploy");
     const init = rewire("../index");
     const initialize = init.__get__("initialize"); 
     await initialize();
     sdkStub.restore();
   });
 });