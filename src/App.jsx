import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import DashboardLayout from "./components/Layout/Dashboard/DashboardLayout";
import CursosPage from "./pages/dashboard/CursosPage";
import CursoPage from "./pages/dashboard/CursoPage";
import QuestionsPage from "./pages/dashboard/QuestionsPage";
import ModuloPage from "./pages/dashboard/ModuloPage";
import { GlobalProvider } from "./GlobalContext";
import FormAddElement from "./components/Modulos/FormAddElement";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <NextUIProvider>
          <div className="App">
            <Routes>
              <Route element={<DashboardLayout />} path="dashboard">
                {/* La ruta a continuación es index, por lo que coge el mismo pat que el padre */}
                <Route index element={<CursosPage />} />
                <Route path="cursos" element={<CursosPage />} />
                <Route path="cursos/:id" element={<CursoPage />} />
                {<Route path="modulo/:moduleId" element={<ModuloPage />} />}

                <Route path="preguntes-diaries" element={<QuestionsPage />} />
                <Route path="addElement" element={<FormAddElement />} />
                <Route path="*" element={<p>404</p>} />
              </Route>
            </Routes>
          </div>
        </NextUIProvider>
      </GlobalProvider>

    </Router>
  );
}

export default App;
