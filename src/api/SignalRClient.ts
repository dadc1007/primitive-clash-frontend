import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";
import { log, logError } from "@utils";

const IS_DEV = import.meta.env.DEV;

class SignalRClient {
  private connection: HubConnection | null = null;
  private url: string;

  constructor(hubUrl: string) {
    this.url = hubUrl;
  }

  /** Inicializa y configura la conexión con el hub */
  public async connect(): Promise<void> {
    try {
      if (this.connection) {
        log("Ya existe una conexión activa con SignalR.");
        return;
      }

      const token = localStorage.getItem("msalAccessToken");

      this.connection = new HubConnectionBuilder()
        .withUrl(this.url, {
          accessTokenFactory: () => token || "",
        })
        .configureLogging(IS_DEV ? LogLevel.Information : LogLevel.None)
        .withAutomaticReconnect()
        .build();

      this.registerBaseEvents();

      await this.connection.start();
      log("Conectado a SignalR:", this.url);
    } catch (error) {
      logError("Error al conectar con SignalR", error);
    }
  }

  /** Envía un mensaje al servidor */
  public async send(target: string, ...args: unknown[]): Promise<void> {
    if (!this.connection) {
      logError("No hay conexión activa para enviar mensajes");
      return;
    }

    try {
      await this.connection.send(target, ...args);
      log(`Mensaje enviado a "${target}" con args:`, args);
    } catch (error) {
      logError(`Error enviando mensaje a "${target}"`, error);
    }
  }

  /** Suscribe a eventos del servidor */
  public on<T = unknown>(event: string, callback: (data: T) => void): void {
    if (!this.connection) {
      logError("Intento de suscripción sin conexión activa");
      return;
    }

    this.connection.on(event, (data: T) => {
      log(`Evento recibido: "${event}"`, data);
      callback(data);
    });
  }

  /** Cierra la conexión */
  public async disconnect(): Promise<void> {
    if (!this.connection) return;

    try {
      await this.connection.stop();
      log("Conexión SignalR cerrada.");
      this.connection = null;
    } catch (error) {
      logError("Error al cerrar la conexión SignalR", error);
    }
  }

  /** Eventos básicos del ciclo de conexión */
  private registerBaseEvents(): void {
    if (!this.connection) return;

    this.connection.onreconnecting((error) => {
      logError("Reintentando conexión SignalR...", error);
    });

    this.connection.onreconnected((connectionId) => {
      log("Reconectado a SignalR con ID:", connectionId);
    });

    this.connection.onclose((error) => {
      logError("Conexión SignalR cerrada", error);
    });
  }
}

export default SignalRClient;
