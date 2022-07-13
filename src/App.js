import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import AboutUs from "./components/AboutUs/AboutUs";
import Blog from "./components/Blog/Blog";
import ContactUs from "./components/ContactUs/ContactUs";
import CopyRight from "./components/CopyRight/CopyRight";
import Login from "./components/Data/Login/Login";
import Register from "./components/Data/Register/Register";
import Deposit from "./components/Deposit/Deposit";
import Home from "./components/Home/Home";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
export const LoadingTheme = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);

  function loading() {
    setIsLoading(true);
  }

  function handleRender() {
    setRender(false)
  }
  useEffect(() => {
    const handle = setTimeout(function () {
      setIsLoading(false);
      setRender(true);
    }, 1400);
    return () => {
      clearTimeout(handle);
    };
  }, [isLoading]);

  return (
    <div className="App">
      <LoadingTheme.Provider value={{loading,handleRender}}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deposit" element={<Deposit render = {render}/>} />
            <Route path="/blog" element={<Blog render = {render}/>} />
            <Route path="/about-us" element={<AboutUs render = {render}/>} />
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
