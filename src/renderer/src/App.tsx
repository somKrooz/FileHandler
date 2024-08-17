const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar');


import './assets/App.css'


import { useEffect , useState } from "react"
import ReadFile from "./components/Readfile";
import {Select, FormControl , MenuItem} from '@mui/material';
import { PATH } from './shared/constants';


function App(): JSX.Element {

  const [files, setFiles] = useState<string[]>([""]);
  const [selectedFiles , SetselectedFiles] = useState<string>("");  
  const [selectedpath , Setselectedpath] = useState<string>("");  

  const folderPath:string = PATH;

  const watcher:any = chokidar.watch(folderPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });

  const handleFiles = () => {
    try {
      let filenames = fs.readdirSync(folderPath);
      filenames = filenames.filter(filename => filename !== 'python');
      setFiles(filenames); 

    } catch (error) {
      console.error('Error reading directory:', error);
      setFiles([]); 
    }
  }

  useEffect(()=>{
    handleFiles();
    watcher
    .on('add', _ => {
      handleFiles()
    }).on('unlink', _ => {
      handleFiles();
    });

    watcher.close()

  },[watcher])

  const handleSelectChange = (event) => {
    const value = event.target.value;
    SetselectedFiles(value);
    Setselectedpath(path.join(folderPath, value));
  };

  return (
        
    <div className="Krooz">
    <FormControl variant="standard" sx={{ fontSize: "small" }}>
     <Select sx={{fontSize: 12, fontFamily: 'sans-serif',fontWeight: "bold" ,  padding: 1, marginBottom:3, color: "white"}}
      onChange={handleSelectChange}
  >
      {files.map((file, index) => (
         <MenuItem sx={{fontSize:"small" , fontFamily: "sans-serif"}} key={index} value={file}>{file}</MenuItem>
      ))}
    </Select>
    <ReadFile path={selectedpath} name={selectedFiles}></ReadFile>
    
    </FormControl>
    </div>
  )
  
}

export default App
