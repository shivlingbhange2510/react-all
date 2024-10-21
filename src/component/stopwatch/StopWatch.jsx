import React, { useEffect, useState } from 'react'

const StopWatch = () => {
    const [time, setTime]=useState(null);
    const [active, setActive] = useState(true);
    const [stop,setStop]=useState(false);
    const [ reset, setReset] = useState(0)
    const [start, setStart]= useState(false)
    const [minutes, setMinutes]= useState(0)

    useEffect(()=>{
        let interval = null;

        if(active){
            interval = setInterval(()=>{
                setTime((pTime)=> pTime+1);
            }, 1000)
        }else{
            clearInterval(interval)
        }
        console.log("called useEffect", time);
        return ()=> clearInterval(interval)
    }, [time, active])

    const formatTime=()=>{
        // time>60 ? (setTime(0), setMinutes((prevMinutes)=> prevMinutes+1)) : ''
        // time > 6 && (setTime(0), setMinutes(prevMinutes => prevMinutes + 1))
        if(time>60){
            setTime(0);
            setMinutes((prev)=>prev+1)
        }

        return `time :- ${minutes} : ${time}`
    }
  return (
    <div>
      <h2>{formatTime()}</h2>
      <button onClick={()=>setActive(false)}> stop</button>
      <button onClick={()=>setActive(true)}> start</button>

      <button onClick={()=>{setTime(0); setMinutes(0)}}> reset</button>

    </div>
  )
}

export default StopWatch
