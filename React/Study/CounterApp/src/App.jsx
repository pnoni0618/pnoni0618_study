import { useState, useEffect, useRef } from 'react';
import './App.css';
import Controller from './components/Controller';
import Viewer from './components/Viewer';
import Even from './components/Even';

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const isMount = useRef(false);

  const onClickButton = (value) => {
    setCount(count + value);
    // console.log(count);
  };

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log('Update');
  });

  return (
    <div className="App">
      <h1>Sumple Counter</h1>
      <section>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
