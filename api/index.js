const express = require("express");
require("dotenv").config();
const ex_app = express();

//Api route objects imported here
//const mainService = require("./api/mainService");

//Api route objects instantiated here, replace empty object literals with 
//live objects later, comment out each incomplete object until it 
//has been completed.

//=============WIP================
//ex_app.use("/about",{});
//ex_app.use("/blog", {});
//ex_app.use("/projects",{});
//=============WIP================

ex_app.listen(process.env.CURRENT_PORT_1, ()=>{
    console.log("Listening on port " + process.env.CURRENT_PORT_1);
});