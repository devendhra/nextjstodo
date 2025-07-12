"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TodoSkeleton from "../components/TodoSkeleton";
import { useAuth } from "../lib/AuthProvider";
import {
  useTodos,
  useAddTodo,
  useDeleteTodo,
  useToggleTodo,
} from "../hooks/useTodos";

export default function HomePage() {
  const { user } = useAuth();
  const userId = user?.id;
  const router = useRouter();

  const [taskText, setTaskText] = useState("");

  const { data: tasks = [], isLoading } = useTodos(userId);
  const addTodo = useAddTodo(userId);
  const deleteTodo = useDeleteTodo(userId);
  const toggleTodo = useToggleTodo(userId);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const handleAdd = () => {
    if (taskText.trim()) {
      addTodo.mutate(taskText);
      setTaskText("");
    }
  };

  if (!userId) return null;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
        <button
          className="bg-red-600 text-white px-4 py-1 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          className="border w-full p-2 rounded"
          type="text"
          placeholder="Enter a task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <TodoSkeleton key={i} />)
          : tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white p-3 rounded shadow flex justify-between"
              >
                <span
                  className={`cursor-pointer ${
                    task.is_complete ? "line-through text-gray-400" : ""
                  }`}
                  onClick={() =>
                    toggleTodo.mutate({
                      id: task.id,
                      isComplete: !task.is_complete,
                    })
                  }
                >
                  {task.title}
                </span>
                <button
                  className="text-red-500"
                  onClick={() => deleteTodo.mutate(task.id)}
                >
                  ❌
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}