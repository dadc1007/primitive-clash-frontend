import SignalRClient from "@/api/SignalRClient";
import { log, logError } from "@/utils/log.utils";

interface UnityInstance {
  SendMessage: (gameObject: string, method: string, json: string) => void;
}

let unityInstance: UnityInstance | null = null;
let client: SignalRClient | null = null;

/**
 * Unity llama a esta función desde GameClient.cs → StartSignalR(hubUrl)
 */
(globalThis as unknown as Window & { StartSignalR: (hubUrl: string) => Promise<void> }).StartSignalR = async (hubUrl: string) => {
  try {
    log("🎮 Iniciando conexión SignalR desde Unity con hub:", hubUrl);
    client = new SignalRClient(hubUrl);
    await client.connect();

    // Suscripcion a eventos
    client.on("JoinedToGame", (data: Record<string, unknown>) => sendToUnity("JoinedToGame", data));
    client.on("CardSpawned", (data: Record<string, unknown>) => sendToUnity("CardSpawned", data));
    client.on("RefreshHand", (data: Record<string, unknown>) => sendToUnity("RefreshHand", data));
    client.on("TroopMoved", (data: Record<string, unknown>) => sendToUnity("TroopMoved", data));
    client.on("UnitDamaged", (data: Record<string, unknown>) => sendToUnity("UnitDamaged", data));
    client.on("UnitKilled", (data: Record<string, unknown>) => sendToUnity("UnitKilled", data));
    client.on("NewElixir", (value: string | Record<string, unknown>) => sendToUnity("NewElixir", value));
    client.on("EndGame", (data: Record<string, unknown>) => sendToUnity("EndGame", data));
    client.on("Hand", (data: Record<string, unknown>) => sendToUnity("Hand", data));
    client.on("Error", (msg: string | Record<string, unknown>) => sendToUnity("OnServerError", msg));

    log("Suscripciones listas para eventos de Unity/SignalR");
  } catch (err) {
    logError("Error al iniciar SignalR desde Unity", err);
  }
};

/**
 * Unity llama esto desde C# → InvokeServer(methodName, argsJson)
 */
(globalThis as unknown as Window & { InvokeServer: (methodName: string, argsJson: string) => Promise<void> }).InvokeServer = async (methodName: string, argsJson: string) => {
  try {
    if (!client) {
      throw new Error("SignalRClient no inicializado");
    }
    const args = JSON.parse(argsJson);
    await client.send(methodName, ...Object.values(args));
    log("Unity → servidor:", methodName, args);
  } catch (err) {
    logError("Error en InvokeServer", err);
  }
};

/**
 * Guardamos la referencia a Unity para poder enviarle eventos
 */
(globalThis as unknown as Window & { setUnityInstance: (instance: UnityInstance) => void }).setUnityInstance = (instance: UnityInstance) => {
  unityInstance = instance;
  log("UnityInstance asignado correctamente");
};

/**
 * Enviar datos a Unity (usa GameObject="GameClient")
 */
function sendToUnity(method: string, data: string | Record<string, unknown>) {
  try {
    if (!unityInstance) {
      logError("UnityInstance no asignado aún");
      return;
    }
    const json = typeof data === "string" ? data : JSON.stringify(data);
    unityInstance.SendMessage("GameClient", method, json);
    log(`📩 JS → Unity: ${method}`, data);
  } catch (err) {
    logError(`Error enviando evento a Unity (${method})`, err);
  }
}
