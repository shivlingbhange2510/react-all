import React, { useContext } from 'react'
import { ThemeContext } from './ContextAPI'
import GrandChild from './GrandChild'
const Child2 = () => {
    const {theme} = useContext(ThemeContext);
    console.log("child2 comp", theme);
  return (
    <div className={`${theme}`}>
      child component theme : {theme}
      <GrandChild/>
       {/* {theme} */}
    </div>
  )
}

export default Child2
