"use client";

import PatientDashboard from "@/components/dashboard/PatientDashboard";
import { useEffect, useState } from "react";
import { useUser } from "@/firebase";

export default function DashboardPage() {
    const { data: user } = useUser();
    const [userName, setUserName] = useState<string>('Guest');

    useEffect(() => {
        if (user) {
            setUserName(user.displayName || user.email?.split('@')[0] || 'User');
        } else {
            const email = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
            if (email) {
                const name = email.split('@')[0];
                const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
                setUserName(capitalizedName);
            } else {
                setUserName('Guest');
            }
        }
    }, [user]);


  return (
    <div>
         <h1 className="text-3xl font-bold font-headline mb-2">
            Welcome, {userName}!
        </h1>
        <p className="text-muted-foreground mb-8">
            { userName === 'Guest' ? 'Explore the dashboard and get started with your health journey.' : "Here's your personal health dashboard." }
        </p>
        <PatientDashboard />
    </div>
  );
}
