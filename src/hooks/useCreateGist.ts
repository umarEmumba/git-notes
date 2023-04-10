import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../utils";
import useFetchGist from "./useFetchGist";
import userContext from "../context/userContext";

const useProfilePage = () =>{
  let navigate = useNavigate();
  const {user} = useContext(userContext);
  const {id,gistData,loader} = useFetchGist();
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
          const response = await fetch(gistData?.files[Object.keys(gistData?.files)[0]]?.raw_url);
          const resp = await response.text();
          setGistContent(resp)
          // setContent(resp.replace(/^(.*)$/gm, `<span class="numbering">$1</span>`));
          // setLoader(false);
        } catch (err) {
          console.log("API error:", err);
        }
      })();

    }
  },[gistData, id])

  const handleChangeDesc = (e: any) => {
    setGistDesc(e.target.value);
  };
  const handleChangeFileName = (e: any) => {
    setFileName(e.target.value);
  };
  const handleChangeContent = (e: any) => {
    setGistContent(e.target.value);
  };

  const createGist = async () => {

    let requestData: any = {
      description: gistDesc,
      public: true,
      files: {},
    };
    requestData.files[fileName] = {
      content: gistContent,
    };
    await callApi("https://api.github.com/gists", requestData, {
      method: "POST",
      headers: {
        Authorization: `token ${user?.accessToken}`,
      }
    });
    alert("New Gist Created successfully!");
    navigate('/your-gists');
  };
  
  const updateGist =async (id:string) => {
    let requestData: any = {
        description: gistDesc,
        public: true,
        files: {},
      };
      requestData.files[fileName] = {
        content: gistContent,
      };
    await callApi(`https://api.github.com/gists/${id}`, requestData, {
        method: "POST",
        headers: {
          Authorization: `token ${user?.accessToken}`,
        }
    });
    alert("Gist updated successfully");
    navigate('/your-gists');
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