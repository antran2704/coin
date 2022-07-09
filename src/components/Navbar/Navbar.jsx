import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import imgs from "../../assets/imgs";
import { useViewport } from "../../hooks/hook";
import data from "./index";
import "./Navbar.scss";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const [url,setUrl] = useState(window.location.pathname)

  const [width] = useViewport();
  function handleMenu() {
    if (width < 900) {
      setMenu(!menu);
    }
  }

  function handleActive(to) {
    setUrl(to)
  }

  useEffect(() => {
    const items = document.querySelectorAll(".navbar__menu-link");
    items.forEach(function (item) {
      item.classList.remove("navbar__menu-link--active");
      if(item.pathname === url) {
        item.classList.add("navbar__menu-link--active");
      }
    });
  },[url])

  return (
    <div className="navbar">
      <div className="navbar__wrap">
        <div onClick={handleMenu} className=" navbar__btn-menu">
          <HiOutlineMenu />
        </div>
        <div
          onClick={handleMenu}
          className={`navbar__btn-layout ${menu && "show-layout"}`}
        >
          <AiOutlineClose onClick={handleMenu} className="navbar__btn-close" />
        </div>
        <Link to="/" className="navbar__logo">
          <img src={imgs.logo} alt="" className="navbar__logo-img" />
        </Link>
        <div className="navbar-body">
          <ul className={`navbar__menu ${menu && "show-menu"}`}>
            {data.map((item, index) => {
              return (
                <li key={index} className="navbar__menu-item">
                  <Link
                    onClick={function () {
                      handleMenu();
                      handleActive(item.to);
                    }}
                    to={item.to}
                    className="navbar__menu-link"
                  >
                    {item.content}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="navbar__btn">
            <Link to="/login" className="navbar__btn-link">
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
