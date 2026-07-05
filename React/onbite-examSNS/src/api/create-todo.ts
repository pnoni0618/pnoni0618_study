import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function createTodo(content: string) {
  // POST 요청
  // 서버에 "새 데이터 추가" 요청

  const response = await fetch(`${API_URL}/todos`, {
    // HTTP 요청 방식
    // POST = 데이터 생성(추가)
    method: "POST",

    // 서버로 보낼 실제 데이터

    // JSON.stringify()
    // JavaScript 객체 -> JSON 문자열 변환

    // 서버는 보통 JSON 형태 데이터를 사용함
    body: JSON.stringify({
      content,
      isDone: false,
    }),
  });

  // 요청 성공 여부 확인
  // 실패 시 강제로 에러 발생
  if (!response.ok) throw new Error("Create Todo faild");

  // await 사용하는 이유
  // JSON 변환 작업도 비동기이기 때문

  // data 타입은 Todo 객체라도 TypeScript에 알려줌
  const data: Todo = await response.json();

  // 최종 데이터 반환
  return data;
}
