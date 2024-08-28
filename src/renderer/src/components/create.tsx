import {useEffect, useState} from "react";
const fs = require("fs");
const path = require("path");
import { PATH } from "@renderer/shared/constants";
import "../assets/form.css"
import { Button } from "@mui/material";

function Create():JSX.Element{
    const [value,setvalue]  = useState<string>("")
    const [task,setTask] = useState<string[]>([])
    const [project , setProject] = useState<string>("")
    const [isEmpty, setEmpty] = useState(false);


    useEffect(()=>{

        if (project.length > 0){
            setEmpty(false)
        }
        else{
            setEmpty(true)
        }

    },[project]);


    const handleChanges = (event):void =>{
        setvalue(event.target.value);
    } 

    const handleAdd = ():void =>{
        setTask([...task , value])
        setvalue("")

    }

    const handleElementDelete= (event):void =>{
        let filtered:string[] = task.filter((_,index)=>index!==event)
        setTask(filtered.map(task => task.replace(/\//g, '\\')));
    }

    const handleInit = ():void =>{
        setTask([])
        setvalue("")
  
        let json = {
            projectName: project,
            paths: task
        }

        fs.appendFile(path.join(PATH , `${project}.json`) , JSON.stringify(json, null, 2), function (err) {
            if (err) throw err;
            console.log('File created!');
        });

        
    }


    const handleProjectName = (event):void =>{

        setProject(event.target.value)
        
               
    }

    return (
        <div className="cool-div">
           <div className="fire-div">
            <input type="text"
            placeholder="Project name...." 
            value={project}
            onChange={handleProjectName}/><br></br>

            <input type="text"
            placeholder="Enter Path Here..." 
            value={value}
            onChange={handleChanges}/>
            <button onClick={handleAdd}>Add</button>
            </div>
            <ol>
                {task.map((val,key)=>
                <li key={key}>
                    <span>{val}</span>
                    <button className="fire-btn"onClick={()=>handleElementDelete(key)}>Delete</button>
                </li>
            )}

            </ol>
           <Button id="create" disabled={isEmpty} variant="contained" onClick={handleInit}>Create</Button>
        </div>
      );
}
export default Create