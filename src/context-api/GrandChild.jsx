import React, { useContext, useState } from 'react'
import { ThemeContext } from './ContextAPI'
const GrandChild = () => {
    const {theme} = useContext(ThemeContext);
    console.log("console inside grand child ", theme);
  return (
    <div >
       grand child theme color :  {theme}
    </div>
  )
}

export default GrandChild
