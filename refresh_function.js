import React, { useState, useEffect } from "react";

const RecommendationDashboard = () => {
  const MAN_REF_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds
  const AUTO_REF_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  const [manualRefresh, setManualRefresh] = useState(MAN_REF_TIME);
  const [autoRefresh, setAutoRefresh] = useState(AUTO_REF_TIME);

  // Function to handle manual refresh
  const handleManualRefresh = () => {
    if (manualRefresh <= 0) {
      console.log("Manual Refresh Success");
      resetTimers();
    } else {
      const remainingMinutes = Math.ceil(manualRefresh / 60000);
      console.log(`Please wait for ${remainingMinutes} minute(s) to refresh manually.`);
    }
  };

  // Function to reset both timers
  const resetTimers = () => {
    setManualRefresh(MAN_REF_TIME);
    setAutoRefresh(AUTO_REF_TIME);
  };

  // Effect to decrement timers and handle auto-refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setManualRefresh((prev) => Math.max(prev - 1000, 0)); // Decrease by 1 second, min 0
      setAutoRefresh((prev) => Math.max(prev - 1000, 0)); // Decrease by 1 second, min 0
    }, 1000);

    // Handle auto-refresh when the timer hits 0
    if (autoRefresh <= 0) {
      console.log("Auto Refresh Success");
      resetTimers();
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [autoRefresh]);

  return (
    <div>
      <h1>Recommendation Dashboard</h1>
      <div>
        <p>Manual Refresh Timer: {Math.ceil(manualRefresh / 60000)} minute(s) remaining</p>
        <p>Auto Refresh Timer: {Math.ceil(autoRefresh / 60000)} minute(s) remaining</p>
        <button onClick={handleManualRefresh}>Refresh Recommendations</button>
      </div>
    </div>
  );
};

export default RecommendationDashboard;
