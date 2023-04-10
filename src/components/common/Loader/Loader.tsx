import { Avatar, Box } from '@mui/material';
import { FC } from 'react';

const Loader: FC = () => (
  <Box className="flex justify-center">
    <Avatar sx={{width : "8em", height: "8em"}} alt="profile image" src="/assets/images/discord-typing.gif" />
  </Box>
);

export default Loader;
