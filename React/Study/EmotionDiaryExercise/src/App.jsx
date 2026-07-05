import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Button from './components/Button';
import Header from './components/Header';
import Edit from './components/Edit';
import { useReducer, useRef } from 'react';

const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = ({ createDate, emotionId, content }) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 일기 수정 기능
  const onUpdate = ({ id, createDate, emotionId, content }) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };

  // 일기 삭제 기능
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  return (
    <>
      <div>
        <Header
          title={'Header'}
          leftChild={<Button text={'left'} />}
          rightChild={<Button text={'right'} />}
        />
        <Button
          text={123}
          type={'DEFAULT'}
          onClick={() => {
            console.log('123버튼 클릭');
          }}
        />
        <Button
          text={123}
          type={'POSITIVE'}
          onClick={() => {
            console.log('123버튼 클릭');
          }}
        />
        <Button
          text={123}
          type={'NEGATIVE'}
          onClick={() => {
            console.log('123버튼 클릭');
          }}
        />
      </div>
      <button
        onClick={() => {
          onCreate({
            createDate: new Date().getTime(),
            emotionId: 1,
            content: '일기테스트',
          });
        }}
      >
        새로운 일기 추가테스트
      </button>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/Edit/:id" element={<Edit />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
