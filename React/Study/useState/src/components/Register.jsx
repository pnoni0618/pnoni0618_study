import { useState, useRef } from 'react';

// 간단한 회원 가입 폼
// 1. 이름
// 2. 생년월일
// 3. 국적
// 4. 자기소개

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    country: '',
    bio: '',
  });

  const refObj = useRef(0);
  const countRef = useRef(0);
  const inputRef = useRef();

  let count = 0;

  const onChange = (e) => {
    // countRef.current++;
    count++;
    console.log(countRef.current);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (input.name === '') {
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <div>
        <button
          onClick={() => {
            refObj.current++;
            console.log(inputRef.current);
          }}
        >
          ref +1
        </button>
      </div>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder="이름"
        />
      </div>

      <div>
        <input
          name="birth"
          value={input.birth}
          onChange={onChange}
          type="date"
        />
      </div>

      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="jp">일본</option>
        </select>
      </div>

      <div>
        <textarea name="bio" value={input.bio} onChange={onChange} />
      </div>
      <div>
        <button onClick={onSubmit}>제출</button>
      </div>
    </div>
  );
};

export default Register;
