const { ipcMain } = require('electron');
const db = require('./db');

ipcMain.handle('get-notes', async ()=> {
  try { return db.allNotes(); } catch(e){ console.error(e); return []; }
});

ipcMain.handle('create-note', async (ev, note)=> {
  try { db.createNote(note); return true; } catch(e){ console.error(e); return false; }
});

ipcMain.handle('update-note', async (ev, note)=> {
  try { db.updateNote(note); return true; } catch(e){ console.error(e); return false; }
});

ipcMain.handle('export-note', async (ev, note)=> {
  const { dialog } = require('electron');
  const fs = require('fs');
  const res = await dialog.showSaveDialog({defaultPath: note.title + '.md'});
  if(res.canceled) return false;
  try {
    fs.writeFileSync(res.filePath, note.body || '');
    return true;
  } catch(e){
    console.error(e);
    return false;
  }
});
