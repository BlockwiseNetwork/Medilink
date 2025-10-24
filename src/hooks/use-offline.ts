"use client";

import { useState, useEffect } from "react";

const useOffline = (): boolean => {
  // Initialize state to false, and determine the actual status on the client.
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check on initial load, only on the client.
    setIsOffline(!window.navigator.onLine);
    
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOffline;
};

export default useOffline;
