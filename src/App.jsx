import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { NextUIProvider } from "@nextui-org/react";
import DashboardLayout from "./components/Layout/Dashboard/DashboardLayout";
import CursosPage from "./pages/dashboard/CursosPage";
import CursoPage from "./pages/dashboard/CursoPage";
import QuestionsPage from "./pages/dashboard/QuestionsPage";
import ModuloPage from "./pages/dashboard/ModuloPage";
import { GlobalProvider } from "./GlobalContext";

import DetalleNumeral from "./components/Numerales/DetalleNumeral";
import DetalleCamino from "./components/Caminos/DetalleCamino";
import Error404Page from "./pages/dashboard/Error404Page";
import MaterialPage from "./pages/dashboard/MaterialPage";
import VideoPage from "./pages/dashboard/VideoPage";
import AccionaPage from "./pages/dashboard/AccionaPage";
import ExamenForm from "./components/Examenes/ExamenForm";
import ExamenPage from "./pages/dashboard/ExamenPage";
import QuizPage from "./pages/dashboard/QuizPage";
import NumeralPage from "./pages/dashboard/NumeralPage";
import RegisterPage from "./pages/dashboard/RegisterPage";
import LoginPage from "./pages/dashboard/LoginPage";
import UserHomePage from "./pages/user/UserHomePage";
import MicursoPage from "./pages/user/Cursos/MicursoPage";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <NextUIProvider>
          <div className="App">
            <Routes>
              <Route element={<DashboardLayout />} path="dashboard/:id">
                {/* La ruta a continuación es index, por lo que coge el mismo pat que el padre */}
                <Route index element={<CursosPage />} />
                <Route path="cursos" element={<CursosPage />} />
                <Route path="cursos/:id" element={<CursoPage />} />
                {<Route path="modulo/:moduleId" element={<ModuloPage />} />}
                {/* {<Route path="editor" element={<TextEditor />} />} */}
                <Route path="preguntes-diaries" element={<QuestionsPage />} />
                <Route path="examen" element={<ExamenForm />} />

                <Route
                  path="modulo/:moduleId/video/:elementoId"
                  element={<VideoPage />}
                />
                <Route
                  path="modulo/:moduleId/material/:elementoId"
                  element={<MaterialPage />}
                />
                <Route
                  path="modulo/:moduleId/examen/:elementoId"
                  element={<ExamenPage />}
                />
                <Route
                  path="modulo/:moduleId/acciona/:elementoId"
                  element={<AccionaPage />}
                />
                <Route
                  path="modulo/:moduleId/quiz/:elementoId"
                  element={<QuizPage />}
                />
                <Route
                  path="modulo/:moduleId/numeral/:elementoId"
                  element={<NumeralPage />}
                />
                <Route
                  path="modulo/:moduleId/camino/:elementoId"
                  element={<DetalleCamino />}
                />
                <Route path="*" element={<Error404Page />} />
              </Route>

              <Route path="/:id/home" element={<UserHomePage />} />
              <Route path="/:id/curso" element={<MicursoPage />} />

              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />

              <Route path="*" element={<Error404Page />} />
            </Routes>
          </div>
        </NextUIProvider>
      </GlobalProvider>
    </Router>
  );
}

export default App;
