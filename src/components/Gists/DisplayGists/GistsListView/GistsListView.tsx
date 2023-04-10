import { Avatar, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { tableColumns } from '../../../../constants';
import { goToRoute } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import useFilteredGists from '../../../../hooks/useFilteredGists';
import Star from '../../../common/Star/Star';
import Fork from '../../../common/Fork/Fork';
import { useContext } from 'react';
import userContext from '../../../../context/userContext';

const GistsListView = () => {
  const navigate = useNavigate();
  const {filteredGists} = useFilteredGists();
  const {user} = useContext(userContext);
  return (
  <Box>
      <TableContainer>
        <Table>
        <TableHead sx={{backgroundColor: "#c8e9dd"}}>
          <TableRow>
            {
              tableColumns.map((cellHeading,index)=>
              <TableCell key={`cellHeading-${index}`} align="left">{cellHeading}</TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
          filteredGists.map((gist) => (
            <TableRow key={gist.id}>
              <TableCell align='right' sx={{paddingRight: "0px"}}>
                <Avatar alt="profile image" src={gist.owner.avatar_url} />
              </TableCell>
              <TableCell align="center" component="th" scope="row" 
                onClick={() => navigate(goToRoute("/gist", gist?.id))}>
                  <Box className="w-32 truncate text-left">
                <Typography>
                      {gist.owner.login}
                </Typography>
                  </Box>
              </TableCell>
              <TableCell align="left">  {gist.created_at.split("T")[0]} </TableCell>
              <TableCell align="left">  {gist.created_at.split("T")[1].split("Z")}  </TableCell>
              <TableCell align="left">  <Box className="w-32 truncate">{gist.description || gist.node_id}</Box> </TableCell>
              <TableCell align="left">  <Box className="w-32 truncate">{Object.keys(gist.files)[0]}</Box>  </TableCell>
              <TableCell align="left">  
                <Star id={gist.id} /> 
                <Fork id={gist.id} enable={gist.owner.login !== user?.login} />
                </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
        </Table>
      </TableContainer>
  </Box>
  )
};

export default GistsListView;
