import { Card } from "@/components/ui/card";
import type { Message } from "@shared/schema";
import { Bot, User } from "lucide-react";

interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  return (
    <div className={`flex gap-3 ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`
        flex items-center justify-center h-8 w-8 rounded-full
        ${message.isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-muted'}
      `}>
        {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      <Card 
        className={`
          p-4 max-w-[80%]
          ${message.isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border-border/50'}
          rounded-2xl
          ${message.isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}
          transition-all duration-200 hover:scale-[1.01]
          shadow-lg
        `}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <span className="text-xs opacity-70 block mt-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </Card>
    </div>
  );
}