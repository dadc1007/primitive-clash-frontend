import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router}></RouterProvider>
    </MsalProvider>
  );
}

export default App;
