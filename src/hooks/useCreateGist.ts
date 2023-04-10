import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../utils";
import useFetchGist from "./useFetchGist";
import userContext from "../context/userContext";
import { useDispatch } from "react-redux";
import { setSnackBarMessage } from "../store/snackBar";
type RequestDataType =  {
  description: string,
      public: true,
      files: {
        [key: string] : {
          content: string,
        }
      },
}
const useProfilePage = () =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useContext(userContext);
  const {id,gistData,loader,setLoader} = useFetchGist();
  const [fileName, setFileName] = useState<string>("");
  const [gistDesc, setGistDesc] = useState<string>("");
  const [gistContent, setGistContent] = useState("");
  useEffect(()=>{
    if(id && gistData)
    {
      setFileName(Object.keys(gistData?.files)[0] || "");
      setGistDesc(gistData?.description || "");
      
      (async () => {
        try {
          setLoader(true);
          const response = await fetch(gistData?.files[Object.keys(gistData?.files)[0]]?.raw_url);
          const resp = await response.text();
          setGistContent(resp)
        } catch (err) {
          console.log("API error:", err);
        }
        setLoader(false);

      })();

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[gistData, id])

  const handleChangeDesc = (e: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    setGistDesc(e.target.value);
  };
  const handleChangeFileName = (e: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    setFileName(e.target.value);
  };
  const handleChangeContent = (e: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    setGistContent(e.target.value);
  };

  const createGist = async () => {

    const requestData: RequestDataType = {
      description: gistDesc,
      public: true,
      files: {
        [fileName] : {
          content: gistContent,
        }
      },
    };
    setLoader(true);
    try {
        await callApi("https://api.github.com/gists", requestData, {
          method: "POST",
          headers: {
            Authorization: `token ${user?.accessToken}`,
          }
        });
        dispatch(setSnackBarMessage("New Gist Created successfully!"));
        navigate('/your-gists');
      
    } catch (error) {
      dispatch(setSnackBarMessage("Failed!! Something Went Wrong!"));
      
    }
    setLoader(false);

  };
  
  const updateGist =async (id:string) => {
    const requestData: RequestDataType = {
        description: gistDesc,
        public: true,
        files: {
          [fileName] : {
            content: gistContent,
          }
        },
      };
      requestData.files[fileName] = {
        content: gistContent,
      };
      setLoader(true);
      try {
        await callApi(`https://api.github.com/gists/${id}`, requestData, {
            method: "POST",
            headers: {
              Authorization: `token ${user?.accessToken}`,
            }
        });
        dispatch(setSnackBarMessage("Gist updated successfully!"));
        navigate('/your-gists');
      } catch (error) {
        dispatch(setSnackBarMessage("Failed!! Something Went Wrong!"));
      }
      setLoader(false);
  };

  return {
    fileName,
    gistDesc,
    gistContent,
    handleChangeDesc,
    handleChangeFileName,
    handleChangeContent,
    createGist,
    updateGist,
    loader,
    id,
  };
}
export default useProfilePage;