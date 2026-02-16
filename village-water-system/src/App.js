import React, { useState } from 'react';

export default function NetworkArchitect() {
  const [nodes, setNodes] = useState({});
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const addNode = (name) => {
    const id = `V-${Date.now()}`;
    setNodes({ ...nodes, [id]: { name, connections: [] } });
  };

  const addEdge = () => {
    if (!from || !to || from === to) return alert("Invalid Connection");
    const updatedNodes = { ...nodes };
    updatedNodes[from].connections.push(to);
    setNodes(updatedNodes);
    alert(`Edge Created: ${nodes[from].name} -> ${nodes[to].name}`);
  };

  return (
    <div className="p-10 bg-blue-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-4 text-blue-800 underline">Graph Management</h1>
      <button onClick={() => addNode(prompt("Village Name?"))} className="bg-blue-600 text-white px-4 py-2 rounded">Add Village (Node)</button>
      
      <div className="mt-6 p-4 bg-white rounded-xl shadow">
        <h3 className="font-bold">Construct Canal (Edge)</h3>
        <select onChange={(e) => setFrom(e.target.value)} className="border m-2 p-2">
          <option>Source...</option>
          {Object.keys(nodes).map(id => <option key={id} value={id}>{nodes[id].name}</option>)}
        </select>
        <select onChange={(e) => setTo(e.target.value)} className="border m-2 p-2">
          <option>Target...</option>
          {Object.keys(nodes).map(id => <option key={id} value={id}>{nodes[id].name}</option>)}
        </select>
        <button onClick={addEdge} className="bg-cyan-600 text-white px-4 py-2 rounded ml-2">Connect</button>
      </div>

      <div className="mt-6 font-mono text-sm">
        <strong>Adjacency List Structure:</strong>
        <pre>{JSON.stringify(nodes, null, 2)}</pre>
      </div>
    </div>
  );
}