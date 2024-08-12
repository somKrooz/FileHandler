const os = require('os');
const path = require('path');

export const PATH:string =  path.join(os.tmpdir(), 'KroozCache')  

export const JSON_FORMATE = `{
    "projectName": "Project Name",
    "paths": [
        "add Paths"
    ],
    "metadata": {
      "createdBy": "Your Name",
      "createdAt": "2024-08-10T10:00:00Z",
      "version": "1.0.0"
    }
  }`

export const AUTHOR:string = "Som Krooz"