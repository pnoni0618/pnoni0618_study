import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
import { useRef, useReducer, useCallback } from 'react';
import './App.css';
import Exam from './components/Exam';
import { TodoContext } from './components/TodoContext';

const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
];

function reducer(todos, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...todos];
    case 'UPDATE':
      return todos.map((todo) =>
        todo.id === action.targetId ? { ...todo, isDone: !todo.isDone } : todo,
      );
    case 'DELETE':
      return todos.filter((todo) => todo.id !== action.targetId);
    default:
      return todos;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);
  const [todos, dispatch] = useReducer(reducer, mockData);

  // 새로운 Todo 추가하는 함수
  const onCreate = useCallback((content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  //   // newTodo를 setTodos에 추가하기
  //   setTodos([newTodo, ...todos]);
  // };

  // isDone 변경
  // todos State 값들 중에, targetId와 일치하는 id를 갖는 todo아이템 수정하기
  const onUpdate = useCallback((targetId) => {
    /*
    setTodos(
      todos.map((todo) => {
        if (todo.id === targetId) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      }),
    );*/

    // todos 배열을 순회하면서 id가 tergetId인 항목만 새로운 객체로 복사한 뒤 isDone 값을 반대로 바꾸고
    // 나머지는 기존 객체를 그대로 반환해서 결과적으로 해당 항목만 상태가 변경된 새로운 배열을 만든다
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  // 삭제된 todo의 id를 제외한 나머지 요소들만 filter로 모아서 새로운 배열을 만들고,
  // 그 배열로 상태를 업데이트 하면서 화면이 다시 렌더링 된다

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  }, []);

  // useCallback(()=> {},[])

  return (
    <div className="App">
      <Header />
      <TodoContext.Provider value={{ todos, onCreate, onUpdate, onDelete }}>
        <Editor />
        <List />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
