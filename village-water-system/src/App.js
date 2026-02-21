import React, { useState } from 'react';

//LINKED LIST NODE (For History Log)
class LogNode {
  constructor(action) {
    this.action = action;
    this.time = new Date().toLocaleTimeString();
    this.next = null; // Pointer to next node
  }
}

// QUEUE IMPLEMENTATION 
class ServiceQueue {
  constructor() {
    this.items = [];
  }
  enqueue(element) { this.items.push(element); }
  dequeue() { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
}

export default function App() {
  // --- STATE ---
  const [villages, setVillages] = useState({}); // Graph (Adjacency List)
  const [historyHead, setHistoryHead] = useState(null); // Linked List Head
  
  // UI Input States
  const [name, setName] = useState('');
  const [supply, setSupply] = useState('');
  const [demand, setDemand] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');



  // Linked List(Insert at Head)
  const logAction = (action) => {
    const newNode = new LogNode(action);
    newNode.next = historyHead; // New node points to old head
    setHistoryHead(newNode);    // Update head to new node
  };

  // Convert Linked List to Array for Rendering
  const getHistoryList = () => {
    let arr = [];
    let current = historyHead;
    while (current) {
      arr.push({ action: current.action, time: current.time, id: Math.random() });
      current = current.next;
    }
    return arr;
  };

  //  SYSTEM FUNCTIONS 

  // Add Village (Graph Node)
  const addVillage = () => {
    if (!name || !supply || !demand) return alert("Please fill all details");
    const id = `V-${Date.now()}`;
    setVillages({
      ...villages,
      [id]: { 
        name, 
        supply: Number(supply), 
        demand: Number(demand), 
        priority, 
        connections: [] 
      }
    });
    logAction(`REGISTERED: ${name} (Supply: ${supply}L, Demand: ${demand}L)`);
    setName(''); setSupply(''); setDemand('');
  };

  // Create Canal 
  const addConnection = () => {
    if (!sourceId || !targetId || sourceId === targetId) return alert("Invalid selection");
    const updated = { ...villages };
    if (!updated[sourceId].connections.includes(targetId)) {
      updated[sourceId].connections.push(targetId);
      setVillages(updated);
      logAction(`CANAL BUILT: ${villages[sourceId].name} → ${villages[targetId].name}`);
    } else {
      alert("This water channel already exists.");
    }
  };

  // Water Distribution 
  const distributeWater = (fromId, toId) => {
    const fromV = villages[fromId];
    const toV = villages[toId];

    const surplus = fromV.supply - fromV.demand;
    const shortage = toV.demand - toV.supply;

    if (surplus <= 0) return alert(`Failure: ${fromV.name} has no extra water.`);
    if (shortage <= 0) return alert(`Information: ${toV.name} is already satisfied.`);

    const transferAmount = Math.min(surplus, shortage);

    setVillages(prev => ({
      ...prev,
      [fromId]: { ...fromV, supply: fromV.supply - transferAmount },
      [toId]: { ...toV, supply: toV.supply + transferAmount }
    }));

    logAction(`DISTRIBUTED: ${transferAmount}L from ${fromV.name} to ${toV.name}`);
  };

  // PRIORITY QUEUE LOGIC (Sorting for VIP villages)
  const priorityQueue = Object.keys(villages)
    .filter(id => villages[id].demand > villages[id].supply)
    .sort((a, b) => (villages[a].priority === 'Drought-Affected' ? -1 : 1));

  // Network Analytics
  const stats = Object.values(villages).reduce((acc, v) => {
    acc.s += v.supply; acc.d += v.demand; return acc;
  }, { s: 0, d: 0 });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 lg:p-10">
      
      
      <div className="max-w-7xl mx-auto mb-10 bg-gradient-to-br from-blue-900 to-blue-700 p-8 rounded-3xl shadow-xl text-white">
        <h1 className="text-3xl font-black mb-1">Village Water Management System</h1>
        <p className="text-blue-100 text-sm font-medium tracking-wide">NIBM Higher National Diploma - Programming DSA Project</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-4 text-blue-800">1. Add Village Node</h3>
            <div className="space-y-3">
              <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Village Name" value={name} onChange={e => setName(e.target.value)} />
              <div className="flex gap-2">
                <input className="w-1/2 px-4 py-2 border rounded-lg" type="number" placeholder="Supply (L)" value={supply} onChange={e => setSupply(e.target.value)} />
                <input className="w-1/2 px-4 py-2 border rounded-lg" type="number" placeholder="Demand (L)" value={demand} onChange={e => setDemand(e.target.value)} />
              </div>
              <select className="w-full px-4 py-2 border rounded-lg bg-slate-50" value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="Normal">Normal Priority</option>
                <option value="Drought-Affected">Drought-Affected (VIP)</option>
              </select>
              <button onClick={addVillage} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                Register Village
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-4 text-cyan-800">2. Create Canal Edge</h3>
            <div className="space-y-3">
              <select className="w-full px-4 py-2 border rounded-lg bg-slate-50" onChange={e => setSourceId(e.target.value)}>
                <option>Source...</option>
                {Object.keys(villages).map(id => <option key={id} value={id}>{villages[id].name}</option>)}
              </select>
              <select className="w-full px-4 py-2 border rounded-lg bg-slate-50" onChange={e => setTargetId(e.target.value)}>
                <option>Target...</option>
                {Object.keys(villages).map(id => <option key={id} value={id}>{villages[id].name}</option>)}
              </select>
              <button onClick={addConnection} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                Connect Villages
              </button>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-8 space-y-6">
          
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-blue-500">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Supply</p>
              <p className="text-lg font-bold">{stats.s}L</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-orange-500">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Demand</p>
              <p className="text-lg font-bold">{stats.d}L</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-red-500">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Conflicts</p>
              <p className="text-lg font-bold text-red-600">{priorityQueue.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border-b-4 border-green-500">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Nodes</p>
              <p className="text-lg font-bold">{Object.keys(villages).length}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-red-600 uppercase tracking-tighter italic">Priority Queue</h3>
                <div className="animate-pulse flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-[10px] font-bold text-red-500">REAL-TIME</span>
                </div>
              </div>
              <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
                {priorityQueue.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed rounded-2xl text-slate-300 font-medium">
                    Network Balanced: No Shortages
                  </div>
                ) : (
                  priorityQueue.map(id => (
                    <div key={id} className={`p-4 rounded-xl border-l-4 transition-all shadow-sm ${villages[id].priority === 'Drought-Affected' ? 'bg-red-50 border-red-600' : 'bg-orange-50 border-orange-400'}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-black text-slate-800 tracking-tight">{villages[id].name}</span>
                        <span className="text-[8px] font-black px-2 py-1 rounded-full bg-white shadow-sm border uppercase">{villages[id].priority}</span>
                      </div>
                      <p className="text-sm font-bold mt-1 text-red-600">Shortage: {villages[id].demand - villages[id].supply}L</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            
            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700">
              <h3 className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mb-4">Linked List History Output</h3>
              <div className="space-y-2 h-64 overflow-y-auto text-[12px] font-mono text-emerald-400 custom-scrollbar">
                {getHistoryList().map(item => (
                  <p key={item.id} className="border-l-2 border-slate-800 pl-3 leading-tight mb-2">
                    <span className="text-slate-500 mr-2">[{item.time}]</span> 
                    {item.action}
                  </p>
                ))}
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-4 border-b">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Network Flow Analysis Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-[10px] font-black text-slate-600 uppercase">
                  <tr>
                    <th className="p-4">Village Node</th>
                    <th className="p-4">Supply Status</th>
                    <th className="p-4">Directed Edges & Flow Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Object.keys(villages).map(id => (
                    <tr key={id} className="hover:bg-blue-50/50 border-b border-slate-50 last:border-0 transition-colors">
                      <td className="p-4 font-black text-slate-700 uppercase tracking-tighter">{villages[id].name}</td>
                      <td className="p-4">
                        {villages[id].supply >= villages[id].demand ? 
                          <span className="text-green-600 bg-green-100 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Surplus: +{villages[id].supply - villages[id].demand}L</span> : 
                          <span className="text-red-600 bg-red-100 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest underline underline-offset-4 decoration-2">Deficit</span>}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-3">
                          {villages[id].connections.map(cId => (
                            <div key={cId} className="flex items-center gap-2 bg-white border border-slate-200 p-1 pl-3 rounded-xl shadow-sm">
                              <span className="text-[11px] font-bold text-slate-600">→ {villages[cId].name}</span>
                              <button 
                                onClick={() => distributeWater(id, cId)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black px-3 py-2 rounded-lg transition-all uppercase tracking-tighter"
                              >
                                Push Water
                              </button>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}