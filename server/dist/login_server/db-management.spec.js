"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const db_management_1 = require("./db-management");
var dbManager = new db_management_1.DbManager();
describe("DbManager", () => {
    describe("getRegisteredUser", () => {
        it("should return user", (done) => {
            dbManager.getRegisteredUser('user1', 'pass1').then((result) => {
                chai_1.expect(result.name).to.equal('user1');
                done();
            });
        });
        it("should return undefined", (done) => {
            dbManager.getRegisteredUser('userasda', 'pass').then((result) => {
                chai_1.expect(result).to.equal(undefined);
                done();
            });
        });
    });
    describe("getPatientInfo", () => {
        it("should return info", (done) => {
            dbManager.getPatientInfo('user1').then((result) => {
                chai_1.expect(result.name).to.equal('user1');
                done();
            });
        });
        it("should return undefined", (done) => {
            dbManager.getPatientInfo('userasda').then((result) => {
                chai_1.expect(result).to.equal(undefined);
                done();
            });
        });
    });
    describe("getDrInfo", () => {
        it("should return info", (done) => {
            dbManager.getDrInfo('dr1').then((result) => {
                chai_1.expect(result.name).to.equal('dr1');
                done();
            });
        });
        it("should return undefined", (done) => {
            dbManager.getDrInfo('userasda').then((result) => {
                chai_1.expect(result).to.equal(undefined);
                done();
            });
        });
    });
});
//# sourceMappingURL=db-management.spec.js.map