import { useState, useRef, useEffect } from "react";
import { useSession } from "@/hooks/use-session";
import { useListMessages, useSendMessage, getListMessagesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Leaf, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "O que é Área de Preservação Permanente (APP)?",
  "Quanto de Reserva Legal preciso ter?",
  "Como retificar meu CAR?",
];

export default function Chat() {
  const sessionId = useSession();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading } = useListMessages(
    { sessionId: sessionId || "" },
    { query: { enabled: !!sessionId, queryKey: getListMessagesQueryKey({ sessionId: sessionId || "" }) } }
  );

  const sendMessage = useSendMessage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sendMessage.isPending]);

  const handleSend = (text: string) => {
    if (!text.trim() || !sessionId) return;
    setContent("");
    
    // Optimistic update
    const previousMessages = queryClient.getQueryData(getListMessagesQueryKey({ sessionId }));
    
    sendMessage.mutate({
      data: { sessionId, content: text }
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey({ sessionId }) });
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)] md:h-[calc(100dvh-3.5rem)] max-w-3xl mx-auto w-full">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-6 pb-20">
          {!isLoading && (!messages || messages.length === 0) && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 pt-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-serif font-semibold">Como posso ajudar hoje?</h2>
                <p className="text-muted-foreground">
                  Sou seu assistente sobre o Código Florestal. Faça qualquer pergunta sobre o CAR, áreas de proteção ou leis ambientais.
                </p>
              </div>
              
              <div className="grid gap-2 w-full max-w-sm mt-8">
                {SUGGESTIONS.map((suggestion) => (
                  <Button 
                    key={suggestion} 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3 px-4 whitespace-normal"
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-3/4 rounded-2xl rounded-tl-sm" />
              <Skeleton className="h-16 w-3/4 rounded-2xl rounded-tr-sm self-end ml-auto" />
            </div>
          ) : (
            messages?.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm animate-in fade-in slide-in-from-bottom-2",
                  msg.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                )}
              >
                {msg.content}
              </div>
            ))
          )}
          
          {sendMessage.isPending && (
            <div className="flex w-max max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm bg-muted text-foreground rounded-tl-sm animate-pulse">
              <div className="flex space-x-1 items-center h-4">
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(content);
          }}
          className="flex gap-2"
        >
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite sua dúvida..."
            className="flex-1 rounded-full px-4 h-12"
            disabled={sendMessage.isPending || !sessionId}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full w-12 h-12 shrink-0"
            disabled={!content.trim() || sendMessage.isPending || !sessionId}
          >
            <Send className="w-5 h-5" />
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
