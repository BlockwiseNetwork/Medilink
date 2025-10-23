"use client";

import PatientDashboard from "@/components/dashboard/PatientDashboard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('there');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email);
        if (email) {
            const name = email.split('@')[0];
            // Capitalize first letter
            const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
            setUserName(capitalizedName);
        }
    }, []);


  return (
    <div>
         <h1 className="text-3xl font-bold font-headline mb-2">
            Welcome, {userName}!
        </h1>
        <p className="text-muted-foreground mb-8">
            Here&apos;s your personal health dashboard.
        </p>
        <PatientDashboard />
    </div>
  );
}
