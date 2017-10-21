import {expect} from "chai";

import {DbManager} from './db-management';


var dbManager = new DbManager();

describe("DbManager", () => {
  describe("getRegisteredUser", () => {
    it("should return user", (done) => {
      dbManager.getRegisteredUser('user1', 'pass1').then((result) => {
        expect(result.name).to.equal('user1');
        done();
      });
    });
    it("should return undefined", (done) => {
      dbManager.getRegisteredUser('userasda', 'pass').then((result) => {
        expect(result).to.equal(undefined);
        done();
      });
    });
  });
  describe("getPatientInfo", () => {
    it("should return info", (done) => {
      dbManager.getPatientInfo('user1').then((result) => {
        expect(result.name).to.equal('user1');
        done();
      });
    });
    it("should return undefined", (done) => {
      dbManager.getPatientInfo('userasda').then((result) => {
        expect(result).to.equal(undefined);
        done();
      });
    });
  });
  describe("getDrInfo", () => {
    it("should return info", (done) => {
      dbManager.getDrInfo('dr1').then((result) => {
        expect(result.name).to.equal('dr1');
        done();
      });
    });
    it("should return undefined", (done) => {
      dbManager.getDrInfo('userasda').then((result) => {
        expect(result).to.equal(undefined);
        done();
      });
    });
  });
});
