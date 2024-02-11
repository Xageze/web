const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();

// Open SQLite database in memory
let db = new sqlite3.Database('db.db');

// Query to select the first row from your table
const query = "SELECT * FROM products";

// Execute the query
let data = []
db.each(query, (err, row) => {
    if (err) {
        console.error(err.message);
        return;
    }
    // If a row is found
    if (row) {
        data.push(row) // Set the local variable
    } else {
        console.log('No rows found');
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', (req, res) => {
    console.log(data);
    res.send(data);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});