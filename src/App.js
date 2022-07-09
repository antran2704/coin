import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import Deposit from "./components/Deposit/Deposit";
import AboutUs from "./components/AboutUs/AboutUs";
import Login from "./components/Data/Login/Login";
import CopyRight from "./components/CopyRight/CopyRight";
import Register from "./components/Data/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        <CopyRight />
      </Router>
    </div>
  );
}

export default App;
