import { useContext, useState } from "react";
import userContext from "../../../context/userContext";
import {ForkRight} from '@mui/icons-material';
import { forkAGist } from "../../../utils/gistsService";
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "../../../store/snackBar";

type ForkProps = {
  id: string;
  enable: boolean;
};

const Fork = ({ id, enable }: ForkProps) => {
  const [forked, setForked]   = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch  = useDispatch();
  const {user}    = useContext(userContext);

  const forkGist = async (id: string) => {

    if (forked || loading) return;
    if (!enable) {
      dispatch(setSnackBarMessage("You cannot fork your own gist!"));
      return;
    }
    if (user?.login) {
      setLoading(true);
      const response = await forkAGist(id,user?.accessToken);
      if (response) {
        setForked(true);
        dispatch(setSnackBarMessage("This gist has been Successfully forked"));
      }
    } else {
      dispatch(setSnackBarMessage("You need to login to fork a gist"));
    }
    setLoading(false);
  };

  return (
    <>
      <span  onClick={() => forkGist(id)} className="spanWrap cursor-pointer">
        <ForkRight color="primary" />
      </span>
    </>
  );
};

export default Fork;