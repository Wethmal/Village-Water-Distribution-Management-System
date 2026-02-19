 Node and Edge Management
const manageNetwork = (villages, setVillages, logAction) => {
  const addVillageNode = (details) => {
    const id = V-${Date.now()};
    setVillages(prev => ({
      ...prev,
      [id]: { ...details, connections: [] }
    }));
    logAction(NETWORK: Added Node ${details.name});
  };

  const addCanalEdge = (sourceId, targetId) => {
    if (sourceId === targetId) return alert("Source and Target cannot be the same.");
    const updated = { ...villages };
    if (!updated[sourceId].connections.includes(targetId)) {
      updated[sourceId].connections.push(targetId);
      setVillages(updated);
      logAction(NETWORK: Created Edge ${villages[sourceId].name} → ${villages[targetId].name});
    }
  };

  return { addVillageNode, addCanalEdge };
};