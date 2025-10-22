"use client";

import { useLanguage } from "@/hooks/use-language";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleChatMessage } from "@/app/dashboard/chatbot/actions";
import { Message } from "@/lib/definitions";
import Spinner from "../ui/spinner";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Spinner /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Send</span>
    </Button>
  );
}

const initialState = {
  response: "",
  error: false
};

export default function ChatInterface() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [formState, formAction] = useFormState(handleChatMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formState.response) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: formState.response },
      ]);
    }
  }, [formState]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages]);

  const handleFormSubmit = async (formData: FormData) => {
    const query = formData.get("query") as string;
    if (!query) return;

    setMessages((prev) => [...prev, { role: "user", content: query }]);
    formAction(formData);
    formRef.current?.reset();
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-end gap-2",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "bot" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {pending && (
             <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
                    <Spinner />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form
          ref={formRef}
          action={handleFormSubmit}
          className="flex items-center gap-2"
        >
          <Input
            name="query"
            placeholder="Type a message..."
            className="flex-grow"
            autoComplete="off"
            disabled={pending}
          />
          <input type="hidden" name="language" value={language} />
          <Button type="button" size="icon" variant="ghost" disabled={pending}>
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
