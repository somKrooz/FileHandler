import { useEffect , useState } from "react";
import {Button, List , ListItemButton, Typography} from '@mui/material';
const { exec } = require('child_process');
const chokidar = require('chokidar');
const fs = require('fs');
// const path = require('path');

import "../assets/Readfile.css"
import { PATH,PYTHONPATH } from "@renderer/shared/constants";

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
    // const [script , setscript] = useState<string>('') 
    const [pythonfile,setpythonfile] = useState<string[]>([])
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
        let filenames:string[] = fs.readdirSync(PYTHONPATH);
        setpythonfile(filenames);
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

    },[watcher,pythonfile]);

    const handleClick = (val) => {
        if (val) {
            exec(`explorer "${val.replace(/\//g, '\\')}"`);
            }
        
    };

    // const HandlePython = ()=>{
    //     let RUNscript = path.join(PYTHONPATH,script)
    //     const command = `python "${RUNscript}" ${path[0]}`;
    //     alert(command)
    //     // exec(command);
        
    // }

    return (
        <div className="center">

        <Typography sx={{color:"white",fontSize: "small"}} variant="h6" >{name} </Typography>
        <List  sx={{ maxWidth:500,overflow:"hidden",scrollbarWidth:2,margin:1,fontSize: "small"}}>
            {paths.map((path,index)=>{
                return <ListItemButton  sx={{overflow:"clip",maxHeight:50,maxWidth:400,border:1,borderRadius:3,color:"gray",margin:1,fontSize: "small",fontWeight: "bold"}} key={index} onClick={()=>handleClick(path)}> {path} </ListItemButton>
            })}

        </List>
        {/* <Typography sx={{color:"GrayText",fontSize: "small"}} variant="h6" >Attach Python Script</Typography>
        <Select sx={{fontSize: 12, fontFamily: 'sans-serif',fontWeight: "bold" ,  padding: 1, marginBottom:3, color: "white"}}
        >
            {pythonfile.map((file, index) => (
                <MenuItem onClick={()=>setscript(file)} sx={{ fontSize:"small" , fontFamily: "sans-serif"}} key={index} value={file}>{file}</MenuItem>
            ))}
            </Select> */}

        
        <div className="btns">
        <Button sx={{fontSize:10,margin:1}}  disabled={isDisabled} variant="contained" onClick={OpenFiles}>Open</Button>
        {/* <Button sx={{fontSize:10,backgroundColor:"GrayText", margin:1}} variant="contained" onClick={HandlePython} >pyhton</Button> */}
        </div>
        </div>
    );
}

export default ReadFile;