import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, AlertCircle } from "lucide-react";

export function EmergencyContacts() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              National Crisis Hotline
            </h3>
            <p className="text-xl font-bold">988</p>
          </div>
          
          <div>
            <h3 className="font-semibold">Crisis Text Line</h3>
            <p>Text HOME to 741741</p>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              If you're experiencing a mental health emergency, please don't hesitate to reach out for help.
              These services are available 24/7 and are completely confidential.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
