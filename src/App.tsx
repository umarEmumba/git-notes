import { ThemeProvider } from '@emotion/react';
import { createTheme  } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequiresAuth from './components/common/RequiresAuth/RequiresAuth';
import { themePrimaryColor, themeSecondaryColor } from './constants';
import userContext from './context/userContext';
import GistPage from './pages/GistPage/GistPage';
import LandingPage from './pages/LandingPage/LandingPage';
import YourGistsPage from './pages/YourGistsPage/YourGistsPage';
import EditGist from './pages/EditGist/EditGist';
import useAuth from './hooks/useAuth';
import SnackBar from './components/common/SnackBar/SnackBar';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const theme = createTheme ({
  palette: {
    primary:  {
      main : themePrimaryColor,
    },
    secondary: {
      main: themeSecondaryColor,
    },
  }
});

const App = () => {
  const auth = useAuth();
  return (
    <userContext.Provider value = {auth}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/gist/:id" element={<GistPage />} />
            <Route path="/" element={<RequiresAuth />}>
              <Route path="/your-gists" element={<YourGistsPage />} />
              <Route path="/starred-gists" element={<YourGistsPage />} />
              <Route path="/create-gist" element={<EditGist />} />
              <Route path="/edit-gist/:id" element={<EditGist />} />
            </Route>
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;