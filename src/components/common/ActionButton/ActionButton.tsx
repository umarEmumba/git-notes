import { Link, Button } from "@mui/material";
import { FC } from "react";

interface ActionButtonProps {
    url : string;
    label : string;
    btnColor ?: "secondary" | "inherit" | "primary";
}

const ActionButton: FC<ActionButtonProps> = ({url,label,btnColor})=> {
    const buttonSX = {
        marginLeft: "10px", 
        width: "fit-content",
        "&:hover": {
          backgroundColor : "#F0F0F0"
        },
      };
    return (
        <Button variant="contained" color={btnColor || "secondary"} sx={buttonSX}>
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