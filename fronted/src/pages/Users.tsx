import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";
import { useAuthStore } from "../store/authStore";

type User = {
    _id: string;
    userName: string | null;
    email: string;
};

export default function Users() {
    const navigate = useNavigate();

    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUsers() {
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const data = await getUsers(token);

                console.log("USERS FROM SERVER:", data);

                setUsers(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Failed to load users");
                }
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [token, navigate]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div>
            <h1>Users</h1>

            <button onClick={handleLogout}>
                Logout
            </button>

            {error && <p>{error}</p>}

            {!error && (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.userName ?? "No username"}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}