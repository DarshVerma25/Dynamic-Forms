const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'darsh', // replace with your MySQL root password
    database: 'forms_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { formType, name, countryCode, phoneNumber } = req.body;

    // Basic Validation
    if (!name.match(/^[A-Za-z\s]+$/) || !countryCode || !phoneNumber.match(/^\d+$/)) {
        return res.status(400).send('Invalid input');
    }

    const query = 'INSERT INTO forms (formType, name, countryCode, phoneNumber) VALUES (?, ?, ?, ?)';
    db.query(query, [formType, name, countryCode, phoneNumber], (err, result) => {
        if (err) throw err;
        res.send('Form submitted successfully');
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
