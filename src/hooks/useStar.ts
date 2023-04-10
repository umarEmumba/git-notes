import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import userContext from "../context/userContext";
import { AppDispatch } from "../store";
import axios from "axios";
import { starAGist, unStarAGist } from "../utils/gistsService";
import { setSnackBarMessage } from "../store/snackBar";

const useStar = (id : string)=>{
    const [isStarred, setIsStarred] = useState(false);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(userContext);
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {

        (async () => {
    
          try{
            setLoading(true);
            const response = await axios.get(`https://api.github.com/gists/${id}/star`, {
              headers: { Authorization: `token ${user?.accessToken}` },
            });
        
            if (response.status === 204) setIsStarred(true);
          }
          catch(err){
            // console.log("API ERROR",err);
          }
          setLoading(false);
        })();
    
      }, [user?.accessToken, id]);
    
      const starGist = async (id: string) => {
        if (user?.login) {
          setLoading(true);
          const response = await starAGist(id,user?.accessToken);
          if (response) {
            setIsStarred(true);
            dispatch(setSnackBarMessage("This gist has been Starred!"));
          }
        } else {
            dispatch(setSnackBarMessage("You need to login first"));
        }
        setLoading(false);
      };
    
      const unStarGist = async (id: string) => {
        if (user?.login) {
          setLoading(true);
          const response = await unStarAGist(id,user?.accessToken);
          if (response) {
            setIsStarred(false);
            dispatch(setSnackBarMessage("Gist has been Un-Starred!"));
          }
        } else {
            dispatch(setSnackBarMessage("You need to login first"));
        }
        setLoading(false);
      };
    
      const onClick = (id:string) => {
        if(loading) return;
        isStarred ? unStarGist(id) : starGist(id);
      }
      return {onClick,isStarred}
    
}
export default useStar;