
"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { MessageSquare, Stethoscope, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Doctor } from "@/lib/definitions";
import { getDoctors } from "@/lib/firestore";
import DoctorCard from "./DoctorCard";
import Spinner from "../ui/spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useFirestore } from "@/firebase";

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    async function fetchDoctors() {
      if (!firestore) return;
      setLoading(true);
      try {
        const fetchedDoctors = await getDoctors(firestore);
        if (fetchedDoctors.length === 0) {
            // In a real app, you might not want to seed data here,
            // but for this demo, we'll add a default doctor if none exist.
             const defaultDoctor: Doctor = { id: "1", name: "Dr. Ime Umoh", specialty: "General Practitioner", city: "Uyo", rating: 4.9, contact: "08012345678" };
             setDoctors([defaultDoctor]);
        } else {
            setDoctors(fetchedDoctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [firestore]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button size="lg" asChild className="h-auto py-4">
          <Link href="/dashboard" className="flex flex-col items-center">
            <Stethoscope className="w-6 h-6 mb-2" />
            <span>Find a Doctor</span>
          </Link>
        </Button>
        <Button size="lg" asChild variant="secondary" className="h-auto py-4">
          <Link href="/dashboard/chatbot" className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 mb-2" />
            <span>Chat with Medibot</span>
          </Link>
        </Button>
        <Button size="lg" asChild variant="secondary" className="h-auto py-4">
          <Link href="/dashboard/wallet" className="flex flex-col items-center">
            <Wallet className="w-6 h-6 mb-2" />
            <span>My Wallet</span>
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Doctors</CardTitle>
          <CardDescription>
            Find a specialist that meets your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
