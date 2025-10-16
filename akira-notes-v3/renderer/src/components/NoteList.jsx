import React from 'react';

export default function NoteList({notes=[], onOpen, onCreate}){
  return (
    <div>
      <div className="mb-2">
        <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>{
          const id = Date.now().toString();
          const newNote = { id, title: 'Untitled', body: '', tags: [], createdAt: Date.now()};
          window.electron.invoke('create-note', newNote).then(()=> onCreate && onCreate(newNote));
        }}>New Note</button>
      </div>
      <div className="space-y-2 overflow-auto" style={{maxHeight: '70vh'}}>
        {notes.map(n=>(
          <div key={n.id} className="p-2 border rounded hover:bg-gray-50 cursor-pointer" onClick={()=>onOpen(n.id)}>
            <div className="font-medium">{n.title || 'Untitled'}</div>
            <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
