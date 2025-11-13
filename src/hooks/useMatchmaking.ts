import SignalRClient from "@api/SignalRClient";
import { log, logError } from "@utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface MatchFoundData {
  sessionId: string;
  opponentId: string;
  userId: string;
}

interface UseMatchmakingReturn {
  status: string;
  isSearching: boolean;
  matchData: MatchFoundData | null;
  startSearch: (playerId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  error: string | null;
}

export const useMatchmaking = (hubUrl: string): UseMatchmakingReturn => {
  const [status, setStatus] = useState("Idle");
  const [isSearching, setIsSearching] = useState(false);
  const [matchData, setMatchData] = useState<MatchFoundData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<SignalRClient | null>(null);

  /** Conectar al hub */
  const connect = useCallback(async () => {
    try {
      if (!clientRef.current) {
        clientRef.current = new SignalRClient(hubUrl);
        await clientRef.current.connect();

        clientRef.current.on<string>("UpdateStatus", (msg) => {
          log("📡 Estado de matchmaking:", msg);
          setStatus(msg);
        });

        clientRef.current.on<MatchFoundData>("MatchFound", (data) => {
          log("Partida encontrada:", data);
          setMatchData(data);
          setStatus("Match found!");
          setIsSearching(false);
        });
      }
    } catch (err) {
      logError("❌ Error al conectar al hub de matchmaking", err);
      setError("Error al conectar con el servidor.");
    }
  }, [hubUrl]);

  /** Iniciar búsqueda de partida */
  const startSearch = useCallback(
    async (playerId: string) => {
      try {
        setIsSearching(true);
        setStatus("Searching for opponent...");
        await connect();
        await clientRef.current?.send("SearchGame", playerId);
        log(" Enviada solicitud de búsqueda:", playerId);
      } catch (err) {
        logError("Error al iniciar matchmaking", err);
        setError("No se pudo iniciar la búsqueda.");
        setIsSearching(false);
      }
    },
    [connect]
  );

  /** 🔌 Desconectar manualmente */
  const disconnect = useCallback(async () => {
    try {
      await clientRef.current?.disconnect();
      clientRef.current = null;
    } catch (err) {
      logError("Error al desconectarse de matchmaking", err);
    }
  }, []);

  /** Desconectar automáticamente al desmontar el componente */
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    status,
    isSearching,
    matchData,
    startSearch,
    disconnect,
    error,
  };
};
