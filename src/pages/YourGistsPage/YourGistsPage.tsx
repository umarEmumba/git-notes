import { Avatar, Box,  Typography } from '@mui/material';
import { FC, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userContext from '../../context/userContext';
import { AppDispatch } from '../../store';
import { fetchGists } from '../../store/gists/gistsSlice';
import Header from '../../components/Header/Header';
import Gist from '../../components/common/Gist/Gist';
import useFilteredGists from '../../hooks/useFilteredGists';
import ActionButton from '../../components/common/ActionButton/ActionButton';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/common/Loader/Loader';

const YourGistsPage: FC = () => {
  const {user} = useContext(userContext);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const {filteredGists, status} = useFilteredGists();

  useEffect(()=>{
    const fetchGistFunction = location.pathname === "/starred-gists" ? "starredGists" : "getMyGists";
    if(user?.accessToken){
      dispatch(fetchGists({page : 1, func : fetchGistFunction, accessToken : user.accessToken}));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ location.pathname, user?.accessToken])

    return (
      <>
      <Header enableSearchBar={true} />
      <Box className="flex fixed justify-center items-center w-full gap-x-5">
        <Box className="flex flex-col gap-5 text-center basis-1/3 items-center">
          <Avatar sx={{ alignSelf: "center", height: "auto", width: "200px"}} alt="profile image" src={user?.avatar_url} />
          <Typography> {user?.login}</Typography>
          <ActionButton url={user?.html_url || "" } label="View Github Profile" />
        </Box>
        <Box className="max-w-2xl basis-2/3 pl-4 border-l border-slate-200" sx={{overflowY:"scroll", maxHeight:"70vh"}}>
          {
            status === "loading" ? 
            <Loader />
            :
            filteredGists.map((gist)=>
              <Gist key={gist.id} gist={gist}/>
            )
          }
        </Box>
      </Box>
      </>
    );
  }

export default YourGistsPage;