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
(window as Window & { StartSignalR: (hubUrl: string) => Promise<void> }).StartSignalR = async (hubUrl: string) => {
  try {
    log("🎮 Iniciando conexión SignalR desde Unity con hub:", hubUrl);
    client = new SignalRClient(hubUrl);
    await client.connect();

    // Suscripcion a eventos
    client.on("JoinedToGame", (data) => sendToUnity("JoinedToGame", data));
    client.on("CardSpawned", (data) => sendToUnity("CardSpawned", data));
    client.on("RefreshHand", (data) => sendToUnity("RefreshHand", data));
    client.on("TroopMoved", (data) => sendToUnity("TroopMoved", data));
    client.on("UnitDamaged", (data) => sendToUnity("UnitDamaged", data));
    client.on("UnitKilled", (data) => sendToUnity("UnitKilled", data));
    client.on("NewElixir", (value) => sendToUnity("NewElixir", value));
    client.on("EndGame", (data) => sendToUnity("EndGame", data));
    client.on("Hand", (data) => sendToUnity("Hand", data));
    client.on("Error", (msg) => sendToUnity("OnServerError", msg));

    log("Suscripciones listas para eventos de Unity/SignalR");
  } catch (err) {
    logError("Error al iniciar SignalR desde Unity", err);
  }
};

/**
 * Unity llama esto desde C# → InvokeServer(methodName, argsJson)
 */
(window as Window & { InvokeServer: (methodName: string, argsJson: string) => Promise<void> }).InvokeServer = async (methodName: string, argsJson: string) => {
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
(window as Window & { setUnityInstance: (instance: UnityInstance) => void }).setUnityInstance = (instance: UnityInstance) => {
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
