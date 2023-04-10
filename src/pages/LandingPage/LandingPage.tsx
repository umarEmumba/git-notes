import { Container } from "@mui/material";
import Gists from "../../components/Gists/Gists";
import Header from "../../components/Header/Header";
import useLoginWithGithub from "../../hooks/useLoginWithGithub";


const LandingPage = () => {
  useLoginWithGithub();
  return (
    <Container maxWidth={false} disableGutters>
      <Header enableSearchBar={true} />
      <Container>
        <Gists />
      </Container>
    </Container>
  );
}

export default LandingPage;
