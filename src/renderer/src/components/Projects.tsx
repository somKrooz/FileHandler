import { Button ,TextField} from "@mui/material";
import { JSON_FORMATE, PATH } from "@renderer/shared/constants";
import { useState } from "react";
const path = require("path");
const fs = require('fs');
const { exec } = require('child_process');

function Project():JSX.Element{

    const [filename, setfileName] = useState<string>("");
    const [krooz, setKrooz] = useState<string>("");
    const [created, setcreated] = useState<boolean>(false);

    const handleCreate = () => {
        setcreated(true);
        fs.appendFile(path.join(PATH , `${filename}.json`) , JSON_FORMATE, function (err) {
        if (err) throw err;
        console.log('File created!');
        });
        setfileName("");
    }

    const handleFile = (event) => {
        setfileName(event.target.value);
        setKrooz(event.target.value)
    }

    const handleEdit = () => {
        let newPath = path.join(PATH, `${krooz}.json`)
        exec(`start notepad++ "${newPath.replace(/\//g, '\\')}"`);
        setcreated(false);

    }

    return(
    <>
        <TextField  value={filename} sx={{fontFamily:"sans-serif",margin:1}} onChange={(e) => handleFile(e)} id="outlined-basic" label="create file" variant="filled" />
        <Button onClick={handleCreate} sx={{ margin:1, fontFamily:"sans-serif" }} variant="contained"> Create New</Button>
        <Button disabled={!created} onClick={handleEdit} sx={{margin:1,fontFamily:"sans-serif" , fontWeight: "bold"}} variant="contained"> Edit</Button>
    </>
    );
}

export default Project;