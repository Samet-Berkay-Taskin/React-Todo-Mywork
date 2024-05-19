import React from "react";
import Sidebar from "./components/sidebar";
import AppRoutes from "./routes/appRoutes";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '5%' }}>
          <AppRoutes />
        </div>
      </div>
    </>
  );
}


export default App;
