import { Container } from "@mui/material";
import Gists from "./Gists/Gists";
import Header from "../../components/common/Header/Header";
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
