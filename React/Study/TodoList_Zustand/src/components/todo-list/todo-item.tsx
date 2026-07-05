import { Button } from "../ui/button";
import { useDeleteTodo } from "@/store/todos";

export default function TodoItem({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const deleteTodo = useDeleteTodo();
  console.log(deleteTodo);

  const haddleDeleteClick = () => {
    console.log(content);
    deleteTodo(id);
  };

  console.log(deleteTodo);
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border-2">
      {content}
      <Button onClick={haddleDeleteClick}>삭제</Button>
    </div>
  );
}
