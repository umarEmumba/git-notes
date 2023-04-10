import { useSearchParams } from "react-router-dom";
import { callApi } from "../utils";
import { useContext } from "react";
import userContext from "../context/userContext";

const useLoginWithGithub = async () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {setUser} = useContext(userContext);
    const code = searchParams.get('code');
    if(!code)
      return;
    
    try {
      const response = await callApi(
        `http://localhost:3200/login?code=${code}`, null, 
        {
          method: "GET",
          headers: { 
              Accept: "application/json"
          },
        }
      );
      searchParams.delete('code')
      setSearchParams(searchParams);
      const accessToken : string = response?.data?.access_token;
      if(response?.data?.error || !accessToken)
        return;
        // get user from github
        const userResponse  = await callApi("https://api.github.com/user", null, {
          method: "GET",
          headers : { Authorization: `token ${accessToken}` },
        });
        
        if (userResponse && userResponse.data.login) {
          userResponse.data.accessToken = accessToken;
          localStorage.setItem("user", JSON.stringify(userResponse.data));
          setUser(userResponse.data);
        }
    }
    catch (err) {
      console.log("API ERROR", err);
    }
}
export default useLoginWithGithub;