import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState("Hello, user! Welcome to our site.");

  useEffect(() => {
      console.log("Welcome message displayed.");
   }, [message]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
