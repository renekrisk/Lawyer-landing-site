const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'contacts.db');

// Create and connect to database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database schema
function initializeDatabase() {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            service TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(createTableSQL, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Contacts table ready');
        }
    });
}

// Insert new contact submission
function createContact(contactData) {
    return new Promise((resolve, reject) => {
        const { name, email, service, message } = contactData;
        const sql = `INSERT INTO contacts (name, email, service, message) VALUES (?, ?, ?, ?)`;

        db.run(sql, [name, email, service || '', message], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID });
            }
        });
    });
}

// Get all contacts
function getAllContacts() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM contacts ORDER BY created_at DESC`;

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

// Get single contact by ID
function getContactById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM contacts WHERE id = ?`;

        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// Update contact status
function updateContactStatus(id, status) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE contacts SET status = ? WHERE id = ?`;

        db.run(sql, [status, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
}

module.exports = {
    db,
    createContact,
    getAllContacts,
    getContactById,
    updateContactStatus
};
