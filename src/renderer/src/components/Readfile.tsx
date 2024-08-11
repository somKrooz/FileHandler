import { useEffect , useState } from "react";
import {Button, List , ListItemButton, Typography} from '@mui/material';
const { exec } = require('child_process');

import "../assets/Readfile.css"

type Data = {

    path:string,
    name:string
}

function ReadFile(props:Data): JSX.Element {
    const [paths , setpaths] = useState<string[]>([]) 
    const [name , setname] = useState<string>("") 
    const [isDisabled , setisDisabled] = useState<boolean>(true)

    const OpenFiles = () =>{
        paths.forEach(path => {
            if (process.platform === 'win32') {
            exec(`explorer "${path.replace(/\//g, '\\')}"`);
            }
            
        });
    }
    useEffect(() => {

        if (props.path != "")
        {
            setisDisabled(false);
        }

        fetch(props.path)
        .then(response => response.json())
        .then(data => {
            setpaths(data.paths)
            setname(data.projectName)
        })
        .catch(error => console.error('Error fetching JSON:', error));
    },[props.path]);

    const handleClick = (val) => {
        if (val) {
            exec(`explorer "${val.replace(/\//g, '\\')}"`);
            }
        
      };
    
    return (
        <div className="center">

        <Typography sx={{ color:"white",margin:1,fontSize: "small"}} variant="h6" >{name} </Typography>
        <List sx={{margin:1,fontSize: "small"}}>
            {paths.map((path,index)=>{
                return <ListItemButton sx={{color:"white",margin:1,fontSize: "small",fontWeight: "bold"}} key={index} onClick={()=>handleClick(path)}> {path} </ListItemButton>
            })}

        </List>

        <Button disabled={isDisabled} sx={{margin: 1}} variant="outlined" onClick={OpenFiles}>Open</Button>
        </div>
    );
}

export default ReadFile;