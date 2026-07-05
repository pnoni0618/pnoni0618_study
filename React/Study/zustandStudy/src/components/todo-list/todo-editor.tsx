import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();

  // const createTodo = useCreateTodo();
  const [content, setContent] = useState("");

  const onSubmit = () => {
    if (!content.trim()) return;
    mutate(content);
    setContent("");
  };

  return (
    <div className="gap-2 flex">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요!!"
      />
      <Button disabled={isPending} onClick={onSubmit}>
        추가
      </Button>
    </div>
  );
}
