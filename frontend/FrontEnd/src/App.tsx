import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5100/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="flex">
      <h1 className="text-center justify-center items-center text-4xl">{message || "Cargando..."}</h1>
    </div>
  );
}

export default App;
