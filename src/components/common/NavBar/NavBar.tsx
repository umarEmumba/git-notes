import { List } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface NavBarProps {
    children : ReactNode;
}
const NavBar : FC<NavBarProps> = ({children}) => {
    return(
        <nav className="flex justify-center items-center">
            <List className="flex justify-center items-center">
                {children}
            </List>
        </nav>
    );
}
export default NavBar;