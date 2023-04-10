import { Avatar, Box,  Button,  Link, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userContext from '../../context/userContext';
import { AppDispatch, storeStateType } from '../../store';
import { fetchGists } from '../../store/gists/gistsSlice';
import Gist from '../common/Gist/Gist';
import Header from '../Header/Header';

const UserProfile = () => {
  const {user} = useContext(userContext);
  const dispatch = useDispatch<AppDispatch>();
  const {gists,page} = useSelector((state: storeStateType) => state.gists);

  useEffect(()=>{
    dispatch(fetchGists({page, func : 'getGists' , accessToken : user?.accessToken}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
      <>
      <Header />
      <Box className="flex py-10 justify-center align-center w-full gap-x-5 fixed">
        <Box className="flex flex-col gap-5 text-center basis-1/2">
          <Avatar sx={{ alignSelf: "center", height: "auto", width: "50%"}} alt="profile image" src={user?.avatar_url} />
          <Typography> {user?.login}</Typography>
          <Button variant="contained" color="secondary" sx={{marginLeft:"10px"}}>
            <Link 
              underline="none"
              href={user?.url}
                >
                  View Github Profile
            </Link>
          </Button>
          <Link href={user?.url} >View Github Profile</Link>
        </Box>
        <Box className="max-w-2xl basis-1/2" sx={{overflowY:"scroll"}}>
          {
            gists.map((gist)=>
              <Gist key={gist.id} gist={gist}/>
            )
          }
        </Box>
      </Box>
      </>
    );
  }

export default UserProfile;

