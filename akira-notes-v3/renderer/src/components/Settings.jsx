import React from 'react';
export default function Settings(){
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold">Settings</h3>
      <div className="text-xs text-gray-600">No encryption — notes are stored locally in plaintext SQLite DB for now.</div>
    </div>
  );
}
