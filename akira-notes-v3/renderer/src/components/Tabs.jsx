import React from 'react';

export default function Tabs({tabs=[], notes=[], active, onSwitch, onClose}){
  function getTitle(id){
    const n = notes.find(x=> x.id===id);
    return n ? (n.title || 'Untitled') : 'Untitled';
  }
  return (
    <div className="flex items-center gap-2 px-3 py-1 border-b bg-gray-50 dark:bg-gray-900 overflow-auto">
      {tabs.length === 0 && <div className="text-sm text-gray-500">No tabs open</div>}
      {tabs.map(id=> (
        <div key={id} className={`flex items-center gap-2 px-3 py-1 rounded ${active===id ? 'bg-white dark:bg-gray-800 shadow' : 'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'}`} onClick={()=>onSwitch(id)}>
          <div className="text-sm font-medium">{getTitle(id)}</div>
          <button onClick={(e)=>{ e.stopPropagation(); onClose(id); }} className="text-xs px-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">✕</button>
        </div>
      ))}
    </div>
  );
}
