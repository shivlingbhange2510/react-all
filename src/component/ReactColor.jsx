import React, { useEffect, useState, useRef } from "react";
import { SketchPicker } from "react-color";

export const ReactjsColor = ({ setTheme }) => {
  const [hex, setHex] = useState("");
  const [hex2, setHex2] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);

  const pickerRef = useRef();

  const handleColorChange = (color, two) => {
    console.log("*********clr", color, "***********two", two);
    if(two){
      setHex(color.hex);
    }else{
      setHex2(color.hex);

    }
    console.log("hex", hex, 'hex2', hex2 );
  };

  const handleColorChange2=(color)=>{
    setHex2(color.hex)

  }
  const handleInputChange = (e) => {
    console.log("id", e.target.id);
    const newHexValue = e.target.value;
    // if(e.target.id==='background'){
    //   setHex(newHexValue);
    // }else{
    //   setHex2()
    // }

  };

  const handleInputFocus = (background) => {
     if(background){
    setShowPicker(true);
    }else{
    setShowPicker2(true);
    }
  };

  const handleInputBlur = (background) => {
    if(background){
    setShowPicker(false);
    }else{
    setShowPicker2(false);
    }
  };

  const handleClickOutsidePicker = (e) => {
    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("click", handleClickOutsidePicker);
    } else {
      document.removeEventListener("click", handleClickOutsidePicker);
    }
    return () => {
      document.removeEventListener("click", handleClickOutsidePicker);
    };
  }, [showPicker]);

  return (
    <div>
      <input
        id='background'
        type="text"
        value={hex}
        onChange={handleInputChange}
        onFocus={()=>handleInputFocus(true)}
        onBlur={()=>handleInputBlur(true)}
      />

    <input
        type="text"
        id='forground'
        value={hex2}
        onChange={handleInputChange}
        onFocus={ ()=>handleInputFocus(false)}
        onBlur={()=>handleInputBlur(false)}
      />

      {showPicker && (
        <div  >
          <SketchPicker color={hex} onChange={(clr)=> handleColorChange(clr, true)} />
        </div>
      )}
        {showPicker2 && (
        <div  >
          <SketchPicker color={hex2} onChange={(clr)=> handleColorChange(clr, false)}  />
        </div>
      )}
    </div>
  );
};
