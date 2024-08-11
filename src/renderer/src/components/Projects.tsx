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
    <h1>test</h1>
       
    </>
    );
}

export default Project;