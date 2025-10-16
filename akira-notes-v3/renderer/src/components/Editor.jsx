import React, {useState, useEffect} from 'react';
import { marked } from 'marked';

export default function Editor({note, onChange}){
  const [body, setBody] = useState(note.body || '');
  const [title, setTitle] = useState(note.title || '');
  useEffect(()=> {
    setBody(note.body||'');
    setTitle(note.title||'');
  }, [note.id]);

  function save(){
    const updated = {...note, body, title, updatedAt: Date.now()};
    window.electron.invoke('update-note', updated).then(()=> onChange && onChange(updated));
  }

  return (
    <div className="h-full flex flex-col">
      <input className="p-2 mb-2 border rounded" value={title} onChange={(e)=> setTitle(e.target.value)} onBlur={save} />
      <div className="flex-1 flex gap-4">
        <textarea className="w-1/2 p-2 border rounded h-full" value={body} onChange={(e)=>setBody(e.target.value)} />
        <div className="w-1/2 p-2 border rounded h-full overflow-auto" dangerouslySetInnerHTML={{__html: marked.parse(body||'')}} />
      </div>
      <div className="mt-2 flex gap-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={save}>Save</button>
      </div>
    </div>
  );
}
