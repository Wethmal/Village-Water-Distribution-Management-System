import React, { useState } from 'react';

export default function AnalystApp() {
  const [villages, setVillages] = useState([]);
  const [vName, setVName] = useState('');
  const [shortage, setShortage] = useState('');
  const [priority, setPriority] = useState('Normal');

  const addToQueue = () => {
    const newNode = { name: vName, shortage: Number(shortage), priority };
    // Priority Queue Logic: Drought-Affected moves to the front
    const updated = [...villages, newNode].sort((a, b) => 
      (a.priority === 'Drought-Affected' ? -1 : 1)
    );
    setVillages(updated);
    setVName(''); setShortage('');
  };

  return (
    <div className="p-8 bg-orange-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-orange-900 mb-6">Resource Analyst: Priority Queue</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mb-8">
        <h2 className="font-bold mb-4">Register Shortage</h2>
        <input className="border p-2 w-full mb-2" value={vName} onChange={e => setVName(e.target.value)} placeholder="Village Name" />
        <input className="border p-2 w-full mb-2" type="number" value={shortage} onChange={e => setShortage(e.target.value)} placeholder="Shortage (L)" />
        <select className="border p-2 w-full mb-4" value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Drought-Affected">Drought-Affected (VIP)</option>
        </select>
        <button onClick={addToQueue} className="bg-orange-600 text-white px-4 py-2 rounded w-full">Add to Queue</button>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-red-600">Urgent Dispatch List</h2>
        {villages.map((v, i) => (
          <div key={i} className={`p-4 rounded-lg border-l-4 shadow-sm bg-white ${v.priority === 'Drought-Affected' ? 'border-red-500' : 'border-orange-300'}`}>
            <p className="font-bold">{v.name} <span className="text-xs ml-2 px-2 py-1 bg-slate-100 rounded">{v.priority}</span></p>
            <p className="text-red-600 font-mono">Needs: {v.shortage}L</p>
          </div>
        ))}
      </div>
    </div>
  );
}