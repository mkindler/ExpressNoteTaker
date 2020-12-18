const fs = require("fs");

// Set up API routes
module.exports = (app) => {

    // GET /api/notes will read the db.json file and return all saved notes as JSON
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    app.get("/api/notes", (req, res) => {
        return res.json(savedNotes)''
    });

    // POST /api/notes will receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
    app.post('/api/notes', (req, res) => {
        let lastId;
        if (savedNotes.length) {
            lastId = Math.max(...app(savedNotes.map(note => note.id)));
        }
        else {
            lastId = 0;
        }

        const id = lastId + 1;

        savedNotes.push({id, ...req.body});
        res.json(savedNotes.slice(-1));
    });

    // DELETE /api/notes/:id will receive a query parameter containing the id of a note to delete.  
}