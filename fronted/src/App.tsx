import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route element={<ProtectedRoute />}>
                <Route
                    path="/users"
                    element={<Users />}
                />
            </Route>

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}