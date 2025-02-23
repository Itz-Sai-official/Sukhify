import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageItem } from "./message-item";
import { Send, Sparkles } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

export function ChatInterface() {
  const [message, setMessage] = useState("");
  const userId = 1; // For demo, would normally come from auth

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/chat/" + userId],
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/chat", { userId, message: content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/" + userId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessage.mutate(message);
    setMessage("");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-card/95 shadow-lg">
      <div className="h-[600px] flex flex-col">
        <ScrollArea className="flex-1 p-6">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-lg text-muted-foreground animate-pulse">
                Loading messages...
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <Sparkles className="h-12 w-12 text-primary animate-pulse" />
              <div>
                <p className="text-lg text-foreground font-semibold">
                  Welcome to Mental Health Support
                </p>
                <p className="text-muted-foreground mt-2">
                  Feel free to share your thoughts and concerns.<br />
                  I'm here to provide mental health support and guidance.
                </p>
              </div>
              <div className="max-w-sm mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Suggested topics:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Managing stress and anxiety</li>
                  <li>• Coping with difficult emotions</li>
                  <li>• Improving mental well-being</li>
                  <li>• Building healthy habits</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-6 border-t bg-background/50">
          <div className="flex gap-3">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts..."
              disabled={sendMessage.isPending}
              className="bg-background"
            />
            <Button 
              type="submit" 
              disabled={sendMessage.isPending}
              className="px-6 transition-all duration-200 hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}