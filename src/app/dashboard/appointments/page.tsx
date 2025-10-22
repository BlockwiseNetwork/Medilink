import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Appointments</h1>
        <p className="text-muted-foreground">View and manage your appointments.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
            <Calendar className="w-16 h-16 mb-4" />
            <p className="text-lg">The appointments feature is currently under development.</p>
            <p>Stay tuned for updates!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
