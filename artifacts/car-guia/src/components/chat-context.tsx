import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  openWith: (question: string) => void;
  pendingQ: string;
  clearPendingQ: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingQ, setPendingQ] = useState("");

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        openWith: (q) => {
          setPendingQ(q);
          setIsOpen(true);
        },
        pendingQ,
        clearPendingQ: () => setPendingQ(""),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}
