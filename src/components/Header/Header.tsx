import { AppBar, Avatar, Box, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import  { FC, useContext, useMemo, useState } from 'react';
import { clientId, companyLogo, companyLogoAlt } from '../../constants';
import Logo from '../common/Logo/Logo';
import SearchBar from '../common/SearchBar/SearchBar';
import NavBar from '../common/NavBar/NavBar';
import NavBarItem from '../common/NavBarItem/NavBarItem';
import userContext from '../../context/userContext';
import ActionButton from '../common/ActionButton/ActionButton';
import DropDownMenu from '../common/DropDownMenu/DropDownMenu';

interface HeaderProps {
  enableSearchBar ?: boolean;
}

const Header: FC<HeaderProps> = ({enableSearchBar = false}) => {
  const {user} = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(()=> anchorEl ? true : false,[anchorEl]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
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
              {!user?.login ?
                <ActionButton url={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist%20user`} label="Login" />
              : (
                <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      src={user?.avatar_url}
                      alt={user?.login}
                    />
                  </IconButton>
                </Box>
                <DropDownMenu 
                  open={open}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                />
              </>
              )
              }
              
              </NavBarItem>
            </NavBar>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
