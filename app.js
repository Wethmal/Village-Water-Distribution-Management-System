import React, { useState } from 'react';

class LogNode {
  constructor(action) {
    this.action = action;
    this.time = new Date().toLocaleTimeString();
    this.next = null;
  }
}

export default function AuditorApp() {
  const [historyHead, setHistoryHead] = useState(null);
  const [inputAction, setInputAction] = useState('');

  const addLog = () => {
    if (!inputAction) return;
    const newNode = new LogNode(inputAction);
    newNode.next = historyHead; 
    setHistoryHead(newNode);    
    setInputAction('');
  };

  const renderLogs = () => {
    let arr = [];
    let current = historyHead;
    while (current) {
      arr.push(current);
      current = current.next;
    }
    return arr;
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100 font-mono">
      <h1 className="text-2xl font-bold text-emerald-400 mb-6 underline">System Auditor: Linked List Logs</h1>
      
      <div className="mb-8 flex gap-2">
        <input 
          className="bg-slate-800 border border-slate-700 p-2 flex-1 rounded text-white" 
          placeholder="Type system event..." 
          value={inputAction} 
          onChange={e => setInputAction(e.target.value)}
        />
        <button onClick={addLog} className="bg-emerald-600 px-4 py-2 rounded text-white font-bold">Commit Action</button>
      </div>

      <div className="space-y-2">
        <h3 className="text-slate-500 text-xs">HEAD OF LIST →</h3>
        {renderLogs().map((log, index) => (
          <div key={index} className="p-3 border-l-2 border-emerald-500 bg-slate-800/50">
            <span className="text-emerald-500 mr-4">[{log.time}]</span>
            <span>{log.action}</span>
            {log.next && <div className="text-[10px] text-slate-600 mt-1">Pointer: NEXT_NODE</div>}
          </div>
        ))}
        {historyHead === null && <p className="text-slate-600">No logs found in memory.</p>}
      </div>
    </div>
  );
}