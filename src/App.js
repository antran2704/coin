import "./App.scss";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import Deposit from "./components/Deposit/Deposit";
import AboutUs from "./components/AboutUs/AboutUs";
import Login from "./components/Data/Login/Login";
import CopyRight from "./components/CopyRight/CopyRight";
import Register from "./components/Data/Register/Register";
import Loading from "./components/Loading/Loading";
import { createContext, useEffect, useState } from "react";
import ContactUs from "./components/ContactUs/ContactUs";
export const LoadingTheme = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  function loading() {
    setIsLoading(true);
  }
  useEffect(() => {
    const handle = setTimeout(function () {
      setIsLoading(false);
    }, 1000);
    navigate("/")
    return () => {
      clearTimeout(handle);
    };
  }, [isLoading]);

  return (
    <div className="App">
      <LoadingTheme.Provider value={loading}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
          {isLoading && <Loading />}
          <CopyRight />
        </Router>
      </LoadingTheme.Provider>
    </div>
  );
}

export default App;
