import { useNavigate } from "react-router-dom";
import useFilteredGists from "../../../../../../hooks/useFilteredGists";
import { useContext } from "react";
import userContext from "../../../../../../context/userContext";
import { Avatar, Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { goToRoute } from "../../../../../../utils";
import Fork from "../../../../../../components/common/Fork/Fork";
import Star from "../../../../../../components/common/Star/Star";

const ListContent = () => {
    const navigate = useNavigate();
    const {filteredGists} = useFilteredGists();
    const {user} = useContext(userContext);
    return (
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
    )
}
export default ListContent;