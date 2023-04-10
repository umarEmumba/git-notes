import { useNavigate } from "react-router-dom";
import { removeGist } from "../../../utils/gistsService";
import { FC, useContext } from "react";
import { BorderColor, Delete } from "@mui/icons-material";
import Fork from "../Fork/Fork";
import Star from "../Star/Star";
import userContext from "../../../context/userContext";
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "../../../store/snackBar";

interface ActionIconsProps  {
    id : string;
    isOwner : boolean;
}

const ActionIcons : FC<ActionIconsProps> = ({id, isOwner = false}) => {
    const navigate = useNavigate(); 
    const {user} = useContext(userContext);
    const dispatch = useDispatch();

    const onEdit = (id:string) => {
      navigate(`/edit-gist/${id}`)
    }
  
    const onDelete = async (id : string) => {
      const resp = await removeGist(id, user?.accessToken);
      if(resp)
      {
        dispatch(setSnackBarMessage("Gist has been deleted"));
        navigate(`/your-gists`);
        return;
      }
    }
    return (
    <span className="inline-flex justify-center align-center cursor-pointer mr-1">
        {
            isOwner && (
            <>
            <span>
                <BorderColor
                    color="primary"
                    onClick={()=>onEdit(id)}
                />
                Edit
            </span>
            <span>
                <Delete
                    color="primary"
                    onClick={()=>onDelete(id)}
                />
                Delete
            </span>
            </>
            )
        }
        <span>
            <Star id={id} />
            Star
        </span>
        <span>
            <Fork
                enable= {isOwner ? false : true }
                id={id}
            />
            Fork
        </span>
    </span>
    );
}
export default ActionIcons;