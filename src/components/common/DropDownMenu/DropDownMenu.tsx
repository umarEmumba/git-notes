import { Link, MenuItem, Menu } from "@mui/material";
import { authService } from "../../../utils/authService";
import { FC, useContext } from "react";
import userContext from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

interface DropDownMenuProps {
    open : boolean;
    anchorEl : null | HTMLElement;
    handleClose : ()=>void;
}
const DropDownMenu : FC<DropDownMenuProps> = ({open = false, anchorEl = null, handleClose }) => {
    const {deleteUser} = authService();
    const {user,setUser} = useContext(userContext);
    const navigate = useNavigate();
  
    const signOut = () => {
      deleteUser();
      setUser(null);
      navigate('/');
    };
    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem>Signed In as {user?.login}</MenuItem>
            <MenuItem>
            <Link underline="hover" color="inherit" className="w-full  hover:bg-slate-200" href="/create-gist">
                Create Gist
            </Link>
            </MenuItem>
            <MenuItem>
            <Link underline="hover" color="inherit" className="w-full"  href="/your-gists">
                Your Gists
            </Link>
            </MenuItem>
            <MenuItem>
            <Link underline="hover" color="inherit" className="w-full"  href="/starred-gists">
                Starred Gists
            </Link>
            </MenuItem>
            <MenuItem>
            <Link underline="hover" color="inherit" className="w-full" href="https://docs.github.com/en">
                Help
            </Link>
            </MenuItem>
            <MenuItem>
            <Link underline="hover" color="inherit" className="w-full" href={user?.html_url}>
                Your GitHub Profile
            </Link>
            </MenuItem>
            <MenuItem  onClick={signOut}>Sign Out</MenuItem>
        </Menu>
    );
}
export default DropDownMenu;