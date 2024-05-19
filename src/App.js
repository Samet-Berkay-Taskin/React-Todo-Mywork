import React from "react";
import Sidebar from "./components/sidebar";
import AppRoutes from "./routes/appRoutes";
import Navbar from "./components/navbar";
import { useSelector } from "react-redux";
import Login from "./pages/login";

function App() {
  const isLoggedIn = useSelector((state) => (state.myWork.isLoggedIn));
console.log(isLoggedIn)
  return (
    <>
      {isLoggedIn ?
        <div>
          <Navbar />
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '5%' }}>
              <AppRoutes />
            </div>
          </div>
        </div>
        : <Login />
      }

    </>
  );
}


export default App;
