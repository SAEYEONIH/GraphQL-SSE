import { useState, useCallback } from 'react';
import { useGraphQLSSE } from './useGraphQLSSE';

function App() {
  const [count, setCount] = useState(0);
  const [error, setError] = useState<any>(null);

  const onSuccess = useCallback((result: { data: { counter: number } }) => {
  setCount(result.data.counter);
}, []);

  const onError = useCallback((error: any) => {
    setError(error);
  }, []);

  useGraphQLSSE({
    url: 'http://localhost:4000/graphql',
    query: 'subscription { counter }',
    onSuccess,
    onError,
  });

  return (
    <div className="App">
      {error && <p>Error: {JSON.stringify(error)}</p>}
      <p>Counter: {count}</p>
    </div>
  );
}

export default App;