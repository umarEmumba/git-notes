import { FormatListBulleted, GridView } from '@mui/icons-material';
import { Box, Divider } from '@mui/material';
import React, { FC } from 'react';
import { landingPageViews } from '../../../constants';


interface ViewTogglerProps {
  activeView : string;
  setActiveView : (viewName : string)=>void;
}

const ViewToggler: FC<ViewTogglerProps> = ({activeView,setActiveView}) => (
  <Box className="flex justify-end py-5">
    <GridView
      onClick={()=>setActiveView(landingPageViews.grid)}
      color={`${activeView === landingPageViews.grid ? 'primary' : 'disabled'}`}/> 
    <Divider orientation="vertical" flexItem />
    <FormatListBulleted
      onClick={()=>setActiveView(landingPageViews.list)}
      color={`${activeView === landingPageViews.list ? 'primary' : 'disabled'}`} />
  </Box>
);

export default ViewToggler;
