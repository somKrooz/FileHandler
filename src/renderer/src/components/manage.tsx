import { PATH } from "@renderer/shared/constants";
import { useEffect, useState } from "react";
import { Button, List , ListItemButton} from "@mui/material";
const fs = require("fs");
const { exec } = require('child_process');
const Path = require("path");
import "../assets/App.css";

function Manage():JSX.Element{

    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
    let filenames:string[] = fs.readdirSync(PATH);
    setFiles(filenames);
        
    },[files]);

    const handleClick = (path:any) =>{
        let newPath = Path.join(PATH, path)
        exec(`start notepad++ "${newPath.replace(/\//g, '\\')}"`);
        
    }

    const HandleDelete = (path) =>{
        let newPath = Path.join(PATH, path)
        fs.unlink(newPath, (err) => {
            if (err) {
              console.error(err);
            } else {
            }
          });

    }
    
    return(
        <>
        <List>
            {files.map((file,i)=>{
                return <div className="manage-card"> 
                    <ListItemButton sx={{borderRadius:3,margin: .4, backgroundColor: "#2b2b2b", fontFamily: "sans-serif", fontSize: "small", fontWeight:"bold",color:"white"}} onClick={()=>handleClick(file)} key={i} >{file}</ListItemButton>
                    <Button onClick={()=>HandleDelete(file)}  sx={{backgroundColor:"#222222", margin:.8}} variant="outlined">Delete</Button>
                </div>
            })}
            
        </List>
        </>
    )
}

export default Manage;