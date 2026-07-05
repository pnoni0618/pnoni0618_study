import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import type { Todo } from "@/types";

const initialState: { todos: Todo[] } = { todos: [] };

const useTodoStore = create(
  immer(
    combine(initialState, (set) => ({
      actions: {
        createTodo: (content: string) =>
          set((state) => {
            const prevId =
              state.todos.length > 0
                ? state.todos[state.todos.length - 1].id
                : 0;
            state.todos.push({ id: prevId + 1, content });
          }),
        deleteTodo: (id: number) =>
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== id);
          }),
      },
    }))
  )
);

export const useTodos = () => {
  const todos = useTodoStore((state) => state.todos);
  return todos;
};

export const useCreateTodo = () => {
  const createTodo = useTodoStore((state) => state.actions.createTodo);
  return createTodo;
};

export const useDeleteTodo = () => {
  const deleteTodo = useTodoStore((state) => state.actions.deleteTodo);
  return deleteTodo;
};
