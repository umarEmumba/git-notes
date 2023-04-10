import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storeStateType } from "../../../store";
import { toggleSnackBar } from "../../../store/snackBar";

const SnackBar = () => {
    const dispatch = useDispatch();
    const {isOpen,message} = useSelector((state : storeStateType ) => state.snackBar);
    return (
        <Snackbar open={isOpen} autoHideDuration={3000} message={message}
            sx={{height: "100vh"}}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            onClose={()=>dispatch(toggleSnackBar(false))} /> 
    )
}
export default SnackBar;