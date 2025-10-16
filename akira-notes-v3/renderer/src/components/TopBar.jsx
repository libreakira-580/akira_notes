import React from 'react';

export default function TopBar({onNew, onSave, dark, setDark, onExport}){
  return (
    <div className="flex items-center justify-between p-2 border-b bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <button title="New (Ctrl+N)" onClick={onNew} className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">📝 New</button>
        <button title="Save (Ctrl+S)" onClick={onSave} className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">💾 Save</button>
        <button title="Export" onClick={onExport} className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">📤 Export</button>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={()=> setDark(!dark)} className="px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">{dark ? '🌙 Dark' : '☀️ Light'}</button>
        <div className="text-sm text-gray-500">v1.2.0</div>
      </div>
    </div>
  );
}
