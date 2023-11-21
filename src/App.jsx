import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/adminDashboard';

import {NextUIProvider} from "@nextui-org/react";


function App() {
  return (

    <Router>
      <NextUIProvider>
        <div className="App">
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          </Routes>
        </div>
        </NextUIProvider>
    </Router>
  );
}




export default App;
