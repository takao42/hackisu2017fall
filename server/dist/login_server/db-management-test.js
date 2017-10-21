"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_management_1 = require("./db-management");
var dbManager = new db_management_1.DbManager();
dbManager.getRegisteredUser('user1', 'pass1').then((result) => {
    console.log(result);
    console.log(result.name);
});
//# sourceMappingURL=db-management-test.js.map