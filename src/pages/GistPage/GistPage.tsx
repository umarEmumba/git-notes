import { Avatar, Grid, Box, Container } from "@mui/material";
import useGistPage from "../../hooks/useGistPage";
import Header from "../../components/common/Header/Header";
import Loader from "../../components/common/Loader/Loader";
import ActionIcons from "../../components/common/ActionIcons/ActionIcons";
import FileContent from "./FileContent/FileContent";
import GistInfo from "./GistInfo/GistInfo";

const GistPage = () => {
  const { gistData, loader, user } = useGistPage();

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
                <GistInfo username={gistData?.owner?.login || ""} date ={gistData?.created_at || ""}/>
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
