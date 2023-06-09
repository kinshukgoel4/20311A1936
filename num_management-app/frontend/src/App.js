import React, { useEffect, useState } from 'react';

const App = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetch('http://localhost:8080/numbers?url=http%3A%2F%2F104.211.219.98%2Fnumbers%2Fprimes&url=http%3A%2F%2F104.211.219.98%2Fnumbers%2Fodd');
        const data = await response.json();
        setNumbers(data.numbers);
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <h1>Numbers</h1>
      <pre>{JSON.stringify({ numbers })}</pre>
    </div>
  );
};

export default App;
