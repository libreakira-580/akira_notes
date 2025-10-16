// Simple DB layer using better-sqlite3. Plaintext storage (no encryption).
const path = require('path');
const Database = require('better-sqlite3');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'db', 'notes.db');

function init(){
  if(!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH), {recursive:true});
  const db = new Database(DB_PATH);
  db.exec(`CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT,
    body TEXT,
    tags TEXT,
    createdAt INTEGER,
    updatedAt INTEGER
  )`);
  return db;
}

const db = init();

function allNotes(){
  const rows = db.prepare('SELECT * FROM notes ORDER BY createdAt DESC').all();
  return rows.map(r=> ({...r, tags: JSON.parse(r.tags||'[]')}));
}

function createNote(note){
  const body = note.body||'';
  db.prepare('INSERT INTO notes (id,title,body,tags,createdAt,updatedAt) VALUES (?,?,?,?,?,?)')
    .run(note.id, note.title, body, JSON.stringify(note.tags||[]), note.createdAt||Date.now(), note.updatedAt||note.createdAt||Date.now());
}

function updateNote(note){
  const body = note.body||'';
  db.prepare('UPDATE notes SET title=?, body=?, tags=?, updatedAt=? WHERE id=?')
    .run(note.title, body, JSON.stringify(note.tags||[]), note.updatedAt||Date.now(), note.id);
}

module.exports = { allNotes, createNote, updateNote };
