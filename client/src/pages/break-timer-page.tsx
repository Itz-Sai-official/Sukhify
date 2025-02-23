import { BreakTimer } from "@/components/break-timer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function BreakTimerPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-lg">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-2xl font-bold mb-6">Break Timer</h1>
        <p className="text-muted-foreground mb-6">
          Use this timer to maintain a healthy work-break balance. We recommend taking a 5-minute break every 25 minutes.
        </p>
        
        <BreakTimer />
      </div>
    </div>
  );
}
