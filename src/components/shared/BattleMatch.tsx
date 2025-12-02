import { log } from "@utils";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BattleMatch = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unityInstanceRef = useRef<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { connectionData } = location.state || {};

  useEffect(() => {
    window.onReturnToLobby = () => {
      log("🔙 Unity solicitó regresar al lobby");

      // Destruir la instancia de Unity antes de navegar
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit().then(() => {
          unityInstanceRef.current = null;
          navigate("/lobby");
        });
      } else {
        navigate("/lobby");
      }
    };

    const script = document.createElement("script");
    script.src = "/unity/Build/WebGL.loader.js";
    script.onload = () => {
      // @ts-ignore
      createUnityInstance(canvasRef.current, {
        dataUrl: "/unity/Build/WebGL.data.unityweb",
        frameworkUrl: "/unity/Build/WebGL.framework.js.unityweb",
        codeUrl: "/unity/Build/WebGL.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "VelociSquad",
        productName: "PrimitiveClash",
        productVersion: "1.0",
      }).then((unityInstance: any) => {
        unityInstanceRef.current = unityInstance;

        // Enviar datos a Unity
        if (connectionData) {
          unityInstance.SendMessage(
            "NetworkManager",
            "SetConnectionData",
            connectionData
          );
        }
      });
    };
    document.body.appendChild(script);

    return () => {
      log("🧹 Limpiando BattleMatch...");
      delete window.onReturnToLobby;
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit();
      }
    };
  }, [connectionData, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#000",
      }}
    >
      <canvas
        ref={canvasRef}
        id="unity-canvas"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default BattleMatch;
