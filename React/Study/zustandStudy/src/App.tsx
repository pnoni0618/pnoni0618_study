import { Route, Routes } from "react-router";
import CounterPage from "./components/counter/counterPage";
import TodoListPage from "./pages/todo-list-page";
import TodoDetailPage from "./pages/todo-detail-page";

function App() {
  return (
    <Routes>
      <Route path="/count" element={<CounterPage />} />
      <Route path="/todolist" element={<TodoListPage />} />
      <Route path="/todolist/:id" element={<TodoDetailPage />} />
    </Routes>
  );
}

export default App;
