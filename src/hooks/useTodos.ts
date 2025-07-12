import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "../lib/todoService";

export const useTodos = (userId: string) => {
  return useQuery({
    queryKey: ["todos", userId],
    queryFn: () => fetchTodos(userId),
    enabled: !!userId,
  });
};

export const useAddTodo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => addTodo({ title, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos", userId],
      });
    },
  });
};

export const useDeleteTodo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos", userId],
      });
    },
  });
};

export const useToggleTodo = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isComplete }: { id: string; isComplete: boolean }) =>
      toggleTodo(id, isComplete),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos", userId],
      });
    },
  });
};
