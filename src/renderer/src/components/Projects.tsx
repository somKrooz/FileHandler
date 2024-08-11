import { useState } from "react";


function Project():JSX.Element{

    const [count , setcount] = useState(0);
    const HandleAdd =()=> {
        setcount(count+1);;
    }

    const HandleRemove = () =>{
        setcount(count-1);
    }

    return(
    <>
    <button onClick={HandleAdd}>Add</button>
    <button onClick={HandleRemove}>Subtract</button>
       
    </>
    );
}

export default Project;