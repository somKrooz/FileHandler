import { Button ,TextField, Typography } from "@mui/material";
import { PATH } from "@renderer/shared/constants";
import { useState } from "react";
const path = require("path");
const fs = require('fs');


function Project():JSX.Element{

    const [filename, setfileName] = useState<string>("");

    const handleCreate = () => {
        
        fs.appendFile(path.join(PATH , `${filename}.json`) , 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');

        });
    }

    const handleFile = ( event) => {
        setfileName(event.target.value);
    }

    return(
    <>
        <TextField  value={filename}  onChange={(e) => handleFile(e)} id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={handleCreate} sx={{fontFamily:"sans-serif" , fontWeight: "bold"}} variant="contained"> Crerate New</Button>

    </>
    );
}

export default Project;