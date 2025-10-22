'use client'

import useOffline from "@/hooks/use-offline";
import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  const isOffline = useOffline();

  if (!isOffline) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-black text-center p-2 flex items-center justify-center text-sm">
      <WifiOff className="w-4 h-4 mr-2" />
      <span>You are currently offline. Some features may be unavailable.</span>
    </div>
  );
}
