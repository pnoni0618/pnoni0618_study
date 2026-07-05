import "./App.css";
import { Routes } from "react-router";
import { Route } from "react-router";
import TodoList from "./pages/todo-list-page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </div>
  );
}
export default App;
