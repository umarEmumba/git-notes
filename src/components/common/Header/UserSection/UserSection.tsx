import { Avatar, Box, IconButton } from "@mui/material"
import DropDownMenu from "../../DropDownMenu/DropDownMenu"
import {  useContext, useMemo, useState } from "react";
import ActionButton from "../../ActionButton/ActionButton";
import userContext from "../../../../context/userContext";
import { clientId } from "../../../../constants";

const UserSection = () => {
    const {user} = useContext(userContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = useMemo(()=> anchorEl ? true : false,[anchorEl]);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <>
        {
            !user?.login ?
                <ActionButton url={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist%20user`} label="Login" />
                :
                (
                    <>
                        <Box className="flex text-center items-center" >
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? "account-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                            >
                                <Avatar
                                    sx={{ width: 32, height: 32 }}
                                    src={user?.avatar_url}
                                    alt={user?.login}
                                />
                            </IconButton>
                        </Box>
                        <DropDownMenu 
                            open={open}
                            anchorEl={anchorEl}
                            handleClose={handleClose}
                        />
                    </>

                )
            
        }
        </>
    )
}
export default UserSection;