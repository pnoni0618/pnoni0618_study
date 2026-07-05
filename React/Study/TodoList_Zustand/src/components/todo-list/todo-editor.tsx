import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useCreateTodo } from "@/store/todos";

export default function TodoEditor() {
  const createTodo = useCreateTodo();
  const [content, setContent] = useState("");

  const haddleAddClick = () => {
    if (content.trim() === "") return;
    createTodo(content);
    setContent("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      haddleAddClick();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할일 입력"
        onKeyDown={onKeyDown}
      />
      <Button onClick={haddleAddClick}>추가</Button>
    </div>
  );
}
