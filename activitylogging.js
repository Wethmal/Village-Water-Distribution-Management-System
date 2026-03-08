// MEMBER 4: FUNCTION - Activity Logging & Reporting
const manageAuditLog = (history, setHistory) => {
  const logToLinkedList = (message) => {
    const newLog = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    // Prepending mimics a Head pointer insertion in a Linked List (O(1))
    setHistory(prev => [newLog, ...prev]);
  };

  const getFullReport = () => {
    return history.map(log => [${log.timestamp}] ${log.message});
  };

  return { logToLinkedList, getFullReport };
};
