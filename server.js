const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static('./'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("../apiRoutes")(app);
require("../htmlRoutes")(app);

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});