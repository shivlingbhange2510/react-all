"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Child from "./Child2";
import './context.css'
export const ThemeContext = createContext("dark");
export const ContextAPI = () => {
  const url = `https://fakestoreapi.com/products`;

  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => console.log("response is ", res));
  };

  useEffect(() => fetchData(), []);
  const [theme, setTheme] = useState("light");

  const hadnleTheme = (val) => {
    console.log("value", val);
    setTheme(val ?"light": "dark" );
  };

  return (
    <ThemeContext.Provider value={{ theme, fn: hadnleTheme, setTheme }}>
      {/* child component from another file sharing data  */}
      <Child />
        {/* child component in same file  */}
      <ChildComp />  
    </ThemeContext.Provider>
  );
};

const ChildComp = () => {
  const theme = useContext(ThemeContext);
  console.log("Theme is ", theme);
  const [val, setVal] = useState(true);

  return (
    <div className={`${theme?.theme}`}>
      <button style={{ backgroundColor :  theme?.theme ==='light' ? 'red' : 'green'}} onClick={() => (setVal((prev)=>!prev), theme?.fn(!val))}>
        change theme
      </button>
    </div>
  );
};
