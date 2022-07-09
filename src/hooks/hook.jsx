import { useEffect } from "react";
import { useState } from "react";
import { animateScroll } from "react-scroll";

export function useViewport() {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth || document.documentElement.clientWidth
  );

  useEffect(() => {
    function handleWidthScreen() {
      const width = window.innerWidth || document.documentElement.clientWidth;
      setWindowWidth(width);
    }
    handleWidthScreen();
    window.addEventListener("resize", handleWidthScreen);

    return () => {
      window.removeEventListener("resize", handleWidthScreen);
    };
  }, [windowWidth]);

  return [windowWidth];
}

export function useScrollToTop() {
  const [screenTop, setScreenTop] = useState(0);

  useEffect(() => {
    function handleScrollTop() {
      const currentTop = window.scrollY || document.documentElement.clientTop;
      setScreenTop(currentTop);
    }

    handleScrollTop();
    window.addEventListener("scroll", handleScrollTop);

    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [screenTop]);

  return [screenTop];
}

export function scrollToTop() {
  animateScroll.scrollToTop();
}
