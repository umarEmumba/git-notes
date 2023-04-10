import { ListItem } from "@mui/material";
import { FC, ReactNode } from "react";

interface NavBarItemProps  {
children : ReactNode
}
const NavBarItem : FC<NavBarItemProps> = ({children}) => {
    return (
        <ListItem className="">{children}</ListItem>
    )
}
export default NavBarItem;