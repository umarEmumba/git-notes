import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { gistType } from "../store/gists/types";

const useFetchGist = () => {
  const { id } = useParams();
  const [gistData, setGistData] = useState<gistType>();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if(!id)
      return;
    (async () => {
      setLoader(true);

      try {
        const response = await axios.get(`https://api.github.com/gists/${id}`);
        setGistData(response.data);
        setLoader(false);
      } 
      catch (err) {
        console.log("API ERROR", err);
      }
    })();
  }, [id]);

  return {
    id,
    gistData,
    loader,
    setLoader,
  };
};
export default useFetchGist;
