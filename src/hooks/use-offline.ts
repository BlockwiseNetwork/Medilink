"use client";

import { useState, useEffect } from "react";

const useOffline = (): boolean => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check on initial load, but only on the client
    if (typeof window !== "undefined") {
      setIsOffline(!window.navigator.onLine);
    }
    
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
