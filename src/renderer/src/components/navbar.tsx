import { Link } from "react-router-dom"
import { Button } from "@mui/material";

function Navbar():JSX.Element {
    return(
        <div className="navbar">
        
            <Link to={"/"}><Button sx={{color: "white", margin: 2}} variant="text">Projects</Button></Link>
            <Link to={"/create"}><Button sx={{margin: 2}} variant="text">Create</Button></Link>
                
        </div>
    )
}

export default Navbar;