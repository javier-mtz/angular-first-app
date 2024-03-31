import app from "./App.js";
import "./Database.js";

async function init () {
    app.listen(3000);
    console.log("Server on port 3000");
}


init();