const path = require("path");

// Set up HTML route
module.exports = (app) => {
    
    // GET /notes will return the notes.html file
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    //GET * will return the index.html file
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });
};