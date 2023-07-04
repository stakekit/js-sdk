import ReactDOM from "react-dom/client";
import { SKApp } from "./App";
import { darkTheme, lightTheme } from "./styles";
import { config } from "./config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SKApp
    apiKey={config.apiKey}
    theme={{ darkMode: darkTheme, lightMode: lightTheme }}
  />
);
