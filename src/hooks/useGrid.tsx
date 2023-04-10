import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, storeStateType } from "../store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import Gist from "../components/common/Gist/Gist";
import { fetchGists } from "../store/gists/gistsSlice";

const useGrid = ()=>{
    const {page,searchQuery,gists, status} = useSelector((state: storeStateType) => state.gists);
    const [gridGists, setGridGists] = useState(gists);
    const [localPage, setLocalPage] = useState(page);
    const dispatch = useDispatch<AppDispatch>();
    const filteredGists = useMemo(()=>gridGists.filter((gist)=>gist.id.toLowerCase().includes(searchQuery.toLowerCase())),
    [gridGists, searchQuery])
    const rowRenderer = ({ index,  key, style } : any) => {
      const items = [];
      const convertedIndex = index * 3;
      for (let i = convertedIndex; i < convertedIndex + 3; i++) {
        filteredGists[i]?.id &&
        items.push(
          <Box key={`${i}-${filteredGists[i]?.id}`} className="w-1/3">
              <Gist gist={filteredGists[i]} />
            </Box>
        )
      }
      return (
        <Box
          className="flex mb-2"
          key={key}
          style={style}
        >
          {items}
        </Box>
      )
    }
    
    useEffect(function AppendGists(){
      if(page > localPage){
        console.log("when page changes")
        setGridGists((prevGists)=> [...prevGists,...gists])
        setLocalPage(page);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])
  
    const loadMoreRows = useCallback(() => {
      if(status === 'succeeded')
        return dispatch(fetchGists({page :page+1, func : 'getGists'}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ page, status]
    )
    const isRowLoaded = ({index} : any) => {
      return !!filteredGists[index]
    }
    return { rowRenderer, isRowLoaded, loadMoreRows, filteredGists }
}
export default useGrid;