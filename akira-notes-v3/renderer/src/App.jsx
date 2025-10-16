import React, {useState, useEffect} from 'react';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import TopBar from './components/TopBar';
import Tabs from './components/Tabs';
import Settings from './components/Settings';
import './App.css';

export default function App(){
  const [notes, setNotes] = useState([]);
  const [openTabs, setOpenTabs] = useState([]); // array of note ids
  const [activeTab, setActiveTab] = useState(null);
  const [dark, setDark] = useState(false);

  useEffect(()=> {
    window.electron.invoke('get-notes').then(res => {
      if(res) setNotes(res);
    }).catch(()=>{});
  },[]);

  useEffect(()=> {
    document.documentElement.classList.toggle('dark', dark);
  },[dark]);

  function openNoteInTab(id){
    if(!openTabs.includes(id)) setOpenTabs([...openTabs, id]);
    setActiveTab(id);
  }

  function closeTab(id){
    const idx = openTabs.indexOf(id);
    if(idx === -1) return;
    const newTabs = openTabs.filter(t => t !== id);
    setOpenTabs(newTabs);
    if(activeTab === id){
      // choose previous tab or next
      const pick = newTabs[idx-1] || newTabs[0] || null;
      setActiveTab(pick);
    }
  }

  function createNote(){
    const id = Date.now().toString();
    const newNote = { id, title: 'Untitled', body: '', tags: [], createdAt: Date.now()};
    window.electron.invoke('create-note', newNote).then(()=> {
      setNotes([newNote,...notes]);
      openNoteInTab(id);
    });
  }

  function saveNote(updated){
    window.electron.invoke('update-note', updated).then(()=> {
      setNotes(notes.map(n=> n.id===updated.id ? updated : n));
    });
  }

  const activeNote = notes.find(n=> n.id===activeTab) || notes.find(n=> n.id===openTabs[0]) || notes[0] || null;

  return (
    <div className="h-full flex flex-col">
      <TopBar onNew={createNote} onSave={() => { if(activeNote) saveNote(activeNote);} } dark={dark} setDark={setDark} onExport={() => {
        if(activeNote) window.electron.invoke('export-note', activeNote);
      }} />
      <Tabs tabs={openTabs} notes={notes} active={activeTab} onSwitch={setActiveTab} onClose={closeTab} />
      <div className="flex flex-1">
        <div className="w-80 border-r p-3">
          <h2 className="text-xl font-semibold mb-2">Akira Notes</h2>
          <NoteList notes={notes} onOpen={(id)=> openNoteInTab(id)} onCreate={(n)=>setNotes([n,...notes])} />
          <Settings />
        </div>
        <div className="flex-1 p-4">
          { activeNote ? <Editor note={activeNote} onChange={(updated)=> saveNote(updated)} /> : <div className="text-gray-500">No note selected</div>}
        </div>
      </div>
    </div>
  );
}
