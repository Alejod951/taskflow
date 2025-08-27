import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import BoardComponent from "./components/Board";
import BoardDetail from "./pages/BoardDetails";

function App() {
  return (
    <Router>
      <div style={{ padding: "2rem" }}>
        <LoginForm />

        <Routes>
          <Route path="/" element={<BoardComponent />} />
          <Route path="/boards/:boardId" element={<BoardDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
