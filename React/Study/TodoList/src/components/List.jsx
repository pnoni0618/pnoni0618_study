import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoContext } from './TodoContext';

const List = () => {
  // useState로 사용자가 입력하는 검색어를 관리해준다
  const [search, setSearch] = useState('');
  const { todos, onUpdate, onDelete } = useContext(TodoContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // search가 빈 문자열이면 todos 배열을 그대로 반환하고, 값이 있을 경우 filter를 사용해서 각 todo를 순회하면서
  // content와 seach를 모두 소문자로 변환한 뒤 includes로 포함 여부를 검사해서
  // 검색어가 포함된 todo들만 새로운 배열로 반환한다

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }

    const lowerSearch = search.toLowerCase();

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(lowerSearch),
    );
  };

  const filteredTodos = getFilteredData();

  // useMemo 실습을 위한 함수
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todos) => todos.isDone).length;
    const notDoneCount = todos.filter((todos) => !todos.isDone).length;

    return { totalCount, doneCount, notDoneCount };
  }, [todos]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      {/* filteredTodos 배열을 map으로 순회하면서 각 todo데이터를 TodoItem 컴포넌트로 렌더링한다 
      이때 {...todo}를 사용해 todo객체의 속성들을 props로 전달하고, 
      onUpdate 함수를 함께 전달하여 체크박스 변경 시 상태를 업데이트 할수 있게 한다  */}
      <div className="Todos_wrapper">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
