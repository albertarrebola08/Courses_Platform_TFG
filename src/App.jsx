import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import DashboardLayout from "./components/Layout/Dashboard/DashboardLayout";
import CursosPage from "./pages/dashboard/CursosPage";
import CursoPage from "./pages/dashboard/CursoPage";
import QuestionsPage from "./pages/dashboard/QuestionsPage";
import ModuloPage from "./pages/dashboard/ModuloPage";
import { GlobalProvider } from "./GlobalContext";

import DetalleVideo from "./components/Videos/DetalleVideo";
import DetalleAcciona from "./components/Accionas/DetalleAcciona";
import DetalleExamen from "./components/Examenes/DetalleExamen";
import DetalleMaterial from "./components/Materiales/DetalleMaterial";
import DetalleNumeral from "./components/Numerales/DetalleNumeral";
import DetalleQuiz from "./components/Quizs/DetalleQuiz";
import DetalleCamino from "./components/Caminos/DetalleCamino";

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

                <Route path="modulo/:moduleId/video/:elementoId" element={<DetalleVideo />} />
                <Route path="modulo/:moduleId/material/:elementoId" element={<DetalleMaterial />} />
                <Route path="modulo/:moduleId/examen/:elementoId" element={<DetalleExamen />} />
                <Route path="modulo/:moduleId/acciona/:elementoId" element={<DetalleAcciona />} />
                <Route path="modulo/:moduleId/quiz/:elementoId" element={<DetalleQuiz />} />
                <Route path="modulo/:moduleId/numeral/:elementoId" element={<DetalleNumeral />} />
                <Route path="modulo/:moduleId/camino/:elementoId" element={<DetalleCamino />} />
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
