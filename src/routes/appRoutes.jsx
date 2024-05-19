import { Route, Routes } from "react-router-dom";
import Planned from "../pages/planned";
import Today from "../pages/today";
import Important from "../pages/important";
import Tasks from "../pages/tasks";
import { Profile } from "../pages/profile";
import Login from "../pages/login";
import Search from "../pages/search";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Today />} />
            <Route path='/planned' element={<Planned />} />
            <Route path='/important' element={<Important />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/search" element={<Search />} />
        </Routes>
    )
}
