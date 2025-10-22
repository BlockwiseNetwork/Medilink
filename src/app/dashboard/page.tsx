"use client";

import DoctorDashboard from "@/components/dashboard/DoctorDashboard";
import PatientDashboard from "@/components/dashboard/PatientDashboard";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { profile, loading } = useAuth();

  if (loading || !profile) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (profile.role === "Patient") {
    return <PatientDashboard />;
  }

  if (profile.role === "Doctor") {
    return <DoctorDashboard />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Invalid Role</h1>
      <p>Your user role is not recognized. Please contact support.</p>
    </div>
  );
}
