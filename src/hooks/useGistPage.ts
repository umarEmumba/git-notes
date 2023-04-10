import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import userContext from "../context/userContext";
import { gistType } from "../store/gists/types";

const useGistPage = () => {
  const { id } = useParams();
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
        console.log("API ERROR", err);
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
