import ChatInterface from "@/components/chatbot/ChatInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatbotPage() {
  return (
    <div className="h-full flex flex-col">
       <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Medibot AI Assistant</h1>
        <p className="text-muted-foreground">Your personal AI health assistant. Ask me anything!</p>
      </div>
      <Card className="flex-grow flex flex-col">
        <CardContent className="p-0 flex-grow">
          <ChatInterface />
        </CardContent>
      </Card>
    </div>
  );
}
