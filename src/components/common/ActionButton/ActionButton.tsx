import { Link, Button } from "@mui/material";
import { FC } from "react";

interface ActionButtonProps {
    url : string;
    label : string;
}

const ActionButton: FC<ActionButtonProps> = ({url,label})=> {
    const buttonSX = {
        marginLeft: "10px", 
        width: "fit-content",
        color : "red",
        "&:hover": {
          backgroundColor : "#F0F0F0"
        },
      };
    return (
        <Button variant="contained" color="secondary" sx={buttonSX}>
            <Link
                underline="none"
                href={url}
            >
                {label}
            </Link>
        </Button>
    );
}
export default ActionButton;