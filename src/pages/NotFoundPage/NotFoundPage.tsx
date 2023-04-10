import { Container, Link, Typography } from "@mui/material";
import Header from "../../components/Header/Header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
    <Container>
        <Typography component="h1" className="text-center p-4 pt-8">
            404 Page Not Found!
        <Link className="pl-4" href="/">Go To Home</Link>
        </Typography>        
    </Container>
    </>
  );
};

export default NotFoundPage;
