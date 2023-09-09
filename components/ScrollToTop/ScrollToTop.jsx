import React, { useEffect, useState } from 'react'
import {BiSolidArrowToTop} from "react-icons/bi"
import  Style from "./ScrollTop.module.css"
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const heightToHidden = 50;
    const windowScroll = window.scrollY;

    setIsVisible(windowScroll > heightToHidden);
  };

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedScroll);

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, []);

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };
  return (
    <>
    {
        isVisible && (
            <span className={Style.srcolTotop} onClick={scrollToTop}>
          <BiSolidArrowToTop />
    </span>
        )
    }
    </>
  )
}

export default ScrollToTop