import { Avatar, Typography, Grid, Box, Container } from "@mui/material";
import useGistPage from "../../hooks/useGistPage";
import Header from "../../components/Header/Header";
import Loader from "../../components/common/Loader/Loader";
import { dateToDuration } from "../../utils";
import ActionIcons from "../../components/common/ActionIcons/ActionIcons";
import FileContent from "./FileContent/FileContent";


const GistPage = () => {
  const { gistData, loader, user } =
    useGistPage();

  return (
    <>
      <Header />
      {loader ? <Loader /> 
      :
       gistData && (
        <Container>
          <Box className="m-0 m-auto">
            <Grid container alignItems="center" className="mb-3" sx={{flexWrap: 'nowrap'}}>
              <Grid item xs={2} >
                <Avatar sx={{width: "80%", height: "auto"}} src={gistData?.owner?.avatar_url} alt="User Profile" />
              </Grid>
              <Grid item xs={4} >
                <Box className="pl-4">
                  <Typography color="blue">{gistData?.owner?.login}</Typography>
                  <Typography color="gray" fontSize="14px">
                    Created {dateToDuration(gistData?.created_at)}{" "}
                  </Typography>
                  <Typography color="gray" fontSize="10px">
                    Broadcast Server
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} >
                <Box className="float-right">
                  <ActionIcons 
                    id={gistData.id}
                    isOwner={gistData?.owner?.login === user?.login}
                   />
                </Box>
              </Grid>
            </Grid>
            <FileContent file = {gistData?.files[Object.keys(gistData?.files)[0]]} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default GistPage;
