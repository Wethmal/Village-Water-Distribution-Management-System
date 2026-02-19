import React, { useState } from 'react';

export default function NetworkArchitect() {
  const [nodes, setNodes] = useState({});
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  //ADD VILLAGE 
  const handleAddVillage = () => {
    const name = prompt("Village Name?");
    if (!name) return;

    const supplyInput = prompt("Water Supply (Liters produced)?", "0");
    const demandInput = prompt("Water Demand (Liters needed)?", "0");

    const id = "V-" + Date.now();

    const newVillage = {
      name: name,
      supply: Number(supplyInput),
      demand: Number(demandInput),
      connections: []
    };

    setNodes({ ...nodes, [id]: newVillage });
  };

  // CONNECT & TRANSFER WATER 
  const addEdge = () => {
    if (from === "" || to === "") {
      alert("Select two villages!");
      return;
    }
    if (from === to) {
      alert("Cannot connect a village to itself!");
      return;
    }

    // Create a copy of data to change it
    const copyOfNodes = { ...nodes };
    
    const source = copyOfNodes[from];
    const target = copyOfNodes[to];

    // Calculate surplus: How much extra water does the source have?
    const surplus = source.supply - source.demand;

    if (surplus > 0) {
      // The Logic: Move the extra water!
      source.supply -= surplus; 
      target.supply += surplus; 
      
      // Record the connection (the canal)
      source.connections.push(to);

      setNodes(copyOfNodes);
      alert(`Success! Moved ${surplus}L from ${source.name} to ${target.name}`);
    } else {
      alert(`${source.name} has no extra water to send!`);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#f0f7ff', minHeight: '100vh' }}>
      <h1 style={{ color: '#1e40af' }}>Water Flow Manager</h1>
      
      <button 
        onClick={handleAddVillage} 
        style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        + Add Village
      </button>

      
      <div style={{ marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>Build Canal & Move Water</h3>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Connecting will move all surplus water from Source to Target.</p>
        
        <label>From (Source): </label>
        <select onChange={(e) => setFrom(e.target.value)} style={{ padding: '5px', marginRight: '15px' }}>
          <option value="">Select...</option>
          {Object.keys(nodes).map(id => <option key={id} value={id}>{nodes[id].name}</option>)}
        </select>

        <label>To (Target): </label>
        <select onChange={(e) => setTo(e.target.value)} style={{ padding: '5px' }}>
          <option value="">Select...</option>
          {Object.keys(nodes).map(id => <option key={id} value={id}>{nodes[id].name}</option>)}
        </select>

        <button 
          onClick={addEdge} 
          style={{ marginLeft: '20px', padding: '8px 15px', backgroundColor: '#0891b2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Connect & Flow
        </button>
      </div>

      
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {Object.keys(nodes).map(id => {
          const v = nodes[id];
          const net = v.supply - v.demand;
          
          return (
            <div key={id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', borderLeft: net < 0 ? '5px solid #ef4444' : '5px solid #10b981' }}>
              <strong style={{ fontSize: '1.1rem' }}>{v.name}</strong>
              <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                <div>Supply: {v.supply}L</div>
                <div>Demand: {v.demand}L</div>
                <div style={{ fontWeight: 'bold', marginTop: '5px', color: net >= 0 ? '#059669' : '#dc2626' }}>
                  {net >= 0 ? `Surplus: ${net}L` : `Shortage: ${Math.abs(net)}L`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
      <div style={{ marginTop: '40px', fontSize: '0.8rem', color: '#999' }}>
        <strong>Data Preview:</strong>
        <pre>{JSON.stringify(nodes, null, 2)}</pre>
      </div>
    </div>
  );
}