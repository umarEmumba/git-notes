import { AppBar, Box } from '@mui/material';
import { Container } from '@mui/system';
import  { FC } from 'react';
import { companyLogo, companyLogoAlt } from '../../constants';
import Logo from '../common/Logo/Logo';
import SearchBar from '../common/SearchBar/SearchBar';
import NavBar from '../common/NavBar/NavBar';
import NavBarItem from '../common/NavBarItem/NavBarItem';
import UserSection from './UserSection/UserSection';

interface HeaderProps {
  enableSearchBar ?: boolean;
}

const Header: FC<HeaderProps> = ({enableSearchBar = false}) => {
  
  return (
    <AppBar position="static" className='mb-4'>
      <Container>
        <Box className="flex items-center justify-between py-1">
          <Logo src={companyLogo} altText={companyLogoAlt} />
            <NavBar>
              <NavBarItem>
                {
                  enableSearchBar && <SearchBar  />
                }
              </NavBarItem>
              <NavBarItem>
                <UserSection />
              </NavBarItem>
            </NavBar>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
