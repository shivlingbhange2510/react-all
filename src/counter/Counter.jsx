import { useState } from "react"

export const Counter = ({initialCount})=>{

    const [count, setCount] = useState(initialCount)
    
    const handleIncrement = ()=> setCount((prev)=> prev +1 );
    const handleDecrement = ()=> setCount((prev)=> prev -1 );

    return(
        <div>
            <div>
            count <h3 data-testid="count">  {count} </h3>
            </div>
            
            <button onClick={handleIncrement}> INCREMENT </button>
            <button onClick={handleDecrement}> DECREMENT </button>

        </div>
    )
}
