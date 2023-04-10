import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import userContext from "../context/userContext";
import { gistType } from "../store/gists/types";
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "../store/snackBar";

const useGistPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gistData, setGistData] = useState<gistType | undefined>();
  const [loader, setLoader] = useState(true);
  const {user} = useContext(userContext);

  useEffect(() => {
    
    (async () => {

      try {
        const response = await axios.get(`https://api.github.com/gists/${id}`);
        setGistData(response.data);
        setLoader(false);
      } 
      catch (err) {
        dispatch(setSnackBarMessage("Gist Not Found"));
        navigate("/")
      }
    })();

  }, [user?.accessToken, id]);

  return {
    id,
    gistData,
    loader,
    user,
  };
};
export default useGistPage;
