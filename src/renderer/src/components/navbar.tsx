import { Link } from "react-router-dom"
import { Button } from "@mui/material";
import "../assets/nav.css";

function Navbar():JSX.Element {
    return(
        <div className="navbar">
            <Link to={"/"}><Button sx={{color: "white", margin: 2}} variant="text">Projects</Button></Link>
            <Link reloadDocument to={"/create"}><Button sx={{margin: 2}} variant="text">Create</Button></Link>
            <Link  to={"/manage"}><Button sx={{margin: 2}} variant="text">Manage</Button></Link>
        </div>
    )
}

export default Navbar;