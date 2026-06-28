import { useState, useRef, useEffect } from "react";
import { X, Send, Leaf, MessageSquare, ChevronDown } from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { useListMessages, useSendMessage, getListMessagesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useChatContext } from "@/components/chat-context";

const SUGGESTIONS = [
  "O que é Área de Preservação Permanente (APP)?",
  "Quanto de Reserva Legal preciso ter?",
  "Como retificar meu CAR?",
];

export function FloatingChat() {
  const { isOpen, open, close, pendingQ, clearPendingQ } = useChatContext();
  const sessionId = useSession();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const autoSentRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: messages, isLoading } = useListMessages(
    { sessionId: sessionId || "" },
    { query: { enabled: !!sessionId, queryKey: getListMessagesQueryKey({ sessionId: sessionId || "" }) } }
  );

  const sendMessage = useSendMessage();

  useEffect(() => {
    if (pendingQ && sessionId && !autoSentRef.current && !isLoading && isOpen) {
      autoSentRef.current = true;
      const q = pendingQ;
      clearPendingQ();
      sendMessage.mutate(
        { data: { sessionId, content: q } },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey({ sessionId }) });
          },
        }
      );
    }
  }, [pendingQ, sessionId, isLoading, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      autoSentRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sendMessage.isPending, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim() || !sessionId) return;
    setContent("");
    sendMessage.mutate(
      { data: { sessionId, content: text } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey({ sessionId }) });
        },
      }
    );
  };

  const showEmpty = !isLoading && (!messages || messages.length === 0) && !pendingQ && !sendMessage.isPending;

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={close}
        />
      )}

      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={open}
          aria-label="Abrir assistente"
          className={cn(
            "fixed z-50 flex items-center justify-center rounded-full shadow-xl",
            "bg-primary text-primary-foreground",
            "w-14 h-14",
            "bottom-20 right-4 md:bottom-6 md:right-6",
            "transition-all duration-200 hover:scale-105 active:scale-95",
            "ring-4 ring-primary/20"
          )}
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      <div
        className={cn(
          "fixed z-50 flex flex-col",
          "bg-background shadow-2xl border border-border",
          /* Mobile: slides up from bottom, full width */
          "bottom-0 left-0 right-0 rounded-t-2xl",
          "md:bottom-6 md:left-auto md:right-6 md:w-[380px] md:h-[560px] md:rounded-2xl",
          /* Height on mobile */
          "h-[78dvh]",
          /* Transition */
          "transition-all duration-300",
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full md:translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">Assistente CAR</p>
            <p className="text-[11px] text-muted-foreground">Tire suas dúvidas sobre o Código Florestal</p>
          </div>
          <button
            onClick={close}
            aria-label="Fechar"
            className="w-7 h-7 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronDown className="w-5 h-5 md:hidden" />
            <X className="w-4 h-4 hidden md:block" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 min-h-0">
          <div className="space-y-3 py-4">
            {showEmpty && (
              <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-sm">Como posso ajudar?</p>
                  <p className="text-xs text-muted-foreground">Pergunte sobre CAR, APP, Reserva Legal e muito mais.</p>
                </div>
                <div className="w-full space-y-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="w-full text-left text-xs px-3 py-2 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-colors text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-4/5 rounded-2xl" />
                <Skeleton className="h-12 w-3/5 rounded-2xl ml-auto" />
              </div>
            ) : (
              messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3 py-2 text-sm break-words animate-in fade-in slide-in-from-bottom-1",
                    msg.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-strong:font-semibold dark:prose-invert [&_p]:text-justify [&_li]:text-justify">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              ))
            )}

            {sendMessage.isPending && (
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm px-3 py-2 bg-muted">
                <div className="flex space-x-1 items-center h-4">
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="px-3 pb-3 pt-2 border-t border-border shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(content);
            }}
            className="flex gap-2"
          >
            <Input
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-1 rounded-full px-4 h-10 text-sm"
              disabled={sendMessage.isPending || !sessionId}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full w-10 h-10 shrink-0"
              disabled={!content.trim() || sendMessage.isPending || !sessionId}
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
