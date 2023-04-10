import { useSelector } from "react-redux";
import { storeStateType } from "../store";
import { useMemo } from "react";

const useFilteredGists = () => {
  const {gists,searchQuery,status} = useSelector((state: storeStateType) => state.gists)
  const filteredGists =  useMemo(()=>gists.filter((gist)=>gist.id.toLowerCase().includes(searchQuery.toLowerCase())),
  [gists, searchQuery])
  return {filteredGists, status};
}
export default useFilteredGists;