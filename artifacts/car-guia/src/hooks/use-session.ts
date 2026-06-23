import { useEffect, useState } from "react";
import { useCreateSession } from "@workspace/api-client-react";

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("car-guia-session-id")
  );

  const createSession = useCreateSession();

  useEffect(() => {
    if (!sessionId && !createSession.isPending) {
      createSession.mutate(undefined, {
        onSuccess: (session) => {
          localStorage.setItem("car-guia-session-id", session.id);
          setSessionId(session.id);
        },
      });
    }
  }, [sessionId, createSession.isPending]);

  return sessionId;
}
