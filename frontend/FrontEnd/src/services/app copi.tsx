import { useEffect, useState } from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5100/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div >
      <h1>Bienvenido a TaskFlow</h1>
      <GoogleLoginButton />
    </div>
  );
}

export default App;
