import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/context/userProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            {/* دا علشان اقدر اوصل لبيانات المستخدم من اي مكان واعدلها */}
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
);
