import { TodoContext } from './TodoContext';
import './Editor.css';
import { useState, useRef, useContext } from 'react';

const Editor = () => {
  const [content, setContent] = useState('');
  const contentRef = useRef();
  const { onCreate } = useContext(TodoContext);

  // onCreate를 요청/실행 시키는 이벤트 핸들러
  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  // 사용자의 입력을 setContent로 관리하는 이벤트 핸들러
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  // Enter만 쳐도 추가버튼 실행되는 이벤트 핸들러
  const onKeyDown = (e) => {
    if (e.key === 'Enter') onSubmit();
  };

  return (
    <div className="Editor">
      <input
        onKeyDown={onKeyDown}
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        placeholder="새로운  Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
