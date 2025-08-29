import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import BoardComponent from "./components/Board";
import BoardDetail from "./pages/BoardDetails";
import Navbar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <Router>
      <div >
        
        <Navbar></Navbar>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/boards" element={<BoardComponent />} />
          <Route path="/boards/:boardId" element={<BoardDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
