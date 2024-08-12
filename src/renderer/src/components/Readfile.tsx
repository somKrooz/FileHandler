import { useEffect , useState } from "react";
import {Button, List , ListItemButton, Typography} from '@mui/material';
const { exec } = require('child_process');
const chokidar = require('chokidar');

import "../assets/Readfile.css"
import { PATH } from "@renderer/shared/constants";

type Data = {

    path:string,
    name:string
}

function ReadFile(props:Data): JSX.Element {

    const [update , setupdate] = useState<number>(0)
    const watcher:any = chokidar.watch(PATH, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
      });

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
        watcher
        .on('add', _ => {
            setupdate(update+1)
        }).on('unlink', _ => {
            setupdate(update+1)
        });
    
        watcher.close()

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

    },[watcher]);

    const handleClick = (val) => {
        if (val) {
            exec(`explorer "${val.replace(/\//g, '\\')}"`);
            }
        
      };
    
    return (
        <div className="center">

        <Typography sx={{color:"white",fontSize: "small"}} variant="h6" >{name} </Typography>
        <List  sx={{overflow: "clip", scrollbarWidth:2,margin:1,fontSize: "small"}}>
            {paths.map((path,index)=>{
                return <ListItemButton  sx={{border:1,borderRadius:5, width:200,color:"white",margin:1,fontSize: "small",fontWeight: "bold"}} key={index} onClick={()=>handleClick(path)}> {path} </ListItemButton>
            })}

        </List>

        <Button disabled={isDisabled} variant="outlined" onClick={OpenFiles}>Open All</Button>
        </div>
    );
}

export default ReadFile;