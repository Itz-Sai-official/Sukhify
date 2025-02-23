import { useState } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Chat() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
}
