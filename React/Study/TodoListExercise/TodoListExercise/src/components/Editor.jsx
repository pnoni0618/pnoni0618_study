import './Editor.css';
import { useState, useRef, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const Editor = () => {
  const [content, setContent] = useState('');
  const contentRef = useRef();
  const { onCreate } = useContext(TodoDispatchContext);

  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
