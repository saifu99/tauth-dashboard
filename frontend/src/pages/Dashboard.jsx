import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api"; // your axios instance

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const location = useLocation();
  const fromLogin = location.state?.fromLogin;

  useEffect(() => {
    if (fromLogin) {
      window.history.replaceState({}, document.title);
    }
  }, [fromLogin]);

  const token = localStorage.getItem("token");

  // Redirect if not authenticated
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch profile + tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const taskRes = await API.get("/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data);
        setTasks(taskRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(search.toLowerCase())),
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await API.post(
        "/api/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTasks([res.data, ...tasks]);
      setTitle("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add task");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await API.put(
        `/api/tasks/${id}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !completed } : t)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || fromLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6">
        {/* Add Task */}
        <section className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-3">Create Task</h2>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <form onSubmit={handleAddTask} className="space-y-2">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
              Add Task
            </button>
          </form>
        </section>

        {/* Tasks */}
        <section className="md:col-span-2 bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Your Tasks</h2>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border p-1.5 rounded text-sm"
            />
          </div>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No tasks found</p>
          ) : (
            <ul className="space-y-2">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className="border rounded p-3 flex justify-between items-center hover:bg-gray-50"
                >
                  <div>
                    <h3
                      className={`font-medium ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleComplete(task._id, task.completed)}
                      className={`px-2 py-1 text-sm rounded ${
                        task.completed
                          ? "bg-yellow-400"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="bg-red-500 text-white px-2 py-1 text-sm rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
