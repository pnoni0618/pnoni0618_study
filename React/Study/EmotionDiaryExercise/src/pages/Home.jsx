import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    setParams({ value: 'hi' });
  }, []);
  console.log(params.get('value'));

  return <div>Home</div>;
};

export default Home;
