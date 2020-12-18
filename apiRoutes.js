const fs = require("fs");

// Set up API routes
module.exports = (app) => {

    // GET /api/notes will read the db.json file and return all saved notes as JSON
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    app.get("/api/notes", (req, res) => {
        return res.json(noteList);
    });

    // POST /api/notes will receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
    app.post('/api/notes', (req, res) => {
        let lastId;
        if (noteList.length) {
            lastId = Math.max(...app(noteList.map(note => note.id)));
        }
        else {
            lastId = 0;
        }

        const id = lastId + 1;

        noteList.push({ id, ...req.body });
        res.json(noteList.slice(-1));
    });

    // DELETE /api/notes/:id will receive a query parameter containing the id of a note to delete.
    app.delete('/api/notes/:id', (req, res) => {
        let findNote = noteList.find(({ id }) => id === JSON.parse(req.params.id));

        noteList.splice(noteList.indexOf(findNote), 1);
        res.end("Note was successfully deleted.");
    });

};