import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">View and edit your personal information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
            <User className="w-16 h-16 mb-4" />
            <p className="text-lg">The profile management feature is currently under development.</p>
            <p>You will be able to edit your details here soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
