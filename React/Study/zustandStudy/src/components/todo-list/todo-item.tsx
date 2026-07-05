import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { Button } from "../ui/button";
import type { Todo } from "@/types";
import { Link } from "react-router";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate } = useUpdateTodoMutation();

  const handleCheckboxClick = () => {
    mutate({ id, isDone: !isDone });
  };

  const handleDeleteClick = () => {};

  return (
    <div className="flex items-center justify-between rounded-sm border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>

      <Button onClick={handleDeleteClick} variant="destructive">
        삭제
      </Button>
    </div>
  );
}
