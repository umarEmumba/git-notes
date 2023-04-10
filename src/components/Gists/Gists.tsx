import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { landingPageViews } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, storeStateType } from '../../store';
import { fetchGists } from '../../store/gists/gistsSlice';
import ViewToggler from '../common/ViewToggler/ViewToggler';
import DisplayGists from './DisplayGists/DisplayGists';
import { setSnackBarMessage } from '../../store/snackBar';

interface GistsProps {}

const Gists: FC<GistsProps> = () => {
  const [activeView, setActiveView] = useState<string>(landingPageViews.list);
  const { error, page } = useSelector((state: storeStateType) => state.gists);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(function getGists() {
    dispatch(fetchGists({page, func : 'getGists'}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(function getGists() {
    if(error)
      dispatch(setSnackBarMessage(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error]);
  
  return (
    <Box>
      <ViewToggler activeView={activeView} setActiveView={setActiveView} />
      <DisplayGists activeView={activeView} />
    </Box>
  )
}

export default Gists;
