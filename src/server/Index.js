const app = require("./App");
require("./Database");

async function init () {
    await app.listen(3000);
    console.log("Server on port 3000");
}


init();