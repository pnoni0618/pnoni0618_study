import './List.css';
import TodoItem from './TodoItem';
import { useState, useContext } from 'react';
import { memo } from 'react';
import { TodoStateContext } from '../App';

const List = () => {
  const [search, setSearch] = useState('');
  const todos = useContext(TodoStateContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }

    const lowerSearch = search.toLowerCase();
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(lowerSearch),
    );
  };
  const filteredData = getFilteredData();

  return (
    <div className="List">
      <h4>Todo List 🌷</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="TodoItem_wrapper">
        {filteredData.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default memo(List);
