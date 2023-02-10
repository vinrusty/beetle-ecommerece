import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { RootState } from '../../Context/Context';
import { Favorite, ShoppingBag } from '@mui/icons-material';
import Cookies from 'universal-cookie/cjs/Cookies';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

const pages = ['Men', 'Women', 'Kids'];
const settings = ['Profile', 'Your Orders', 'Your Cart', 'Your Wishlist', 'Logout'];
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const ResponsiveAppBar = ({axiosJWT, URL}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const navigate = useNavigate();
  const cookies = new Cookies();
  const classes = useStyles()
  const matches = useMediaQuery('(min-width: 600px)');

  const { authState, authDispatch, cartState } = RootState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try{
      const data = await axiosJWT.delete(URL+'/api/customers/logout',
        {
          headers: {
            'x-access-token': authState?.aToken
          },
          data:{
            token: authState?.rToken
          }
        }
      )
      const response = await data.data;
      if(response === 'success'){
        authDispatch({
          type: "LOGOUT"
        })
        cookies.remove("user")
        cookies.remove("aToken")
        cookies.remove("rToken")
        window.location.replace(process.env.PUBLIC_URL+'/')
      }
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BEETLES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="inherit">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BEETLES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
                color="secondary"
              >
                {page}
              </Button>
            ))}
          </Box>
          {
            !authState.isAuth ?
            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button
              href='/login'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: 'block' }}
              color= "secondary"
            >
              Login
            </Button>
            <Button
              href='/register'
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: 'block' }}
              color= "secondary"
            >
              Register
            </Button>
          </Box>
            :
            <Box sx={{ flexGrow: 0 }}>
              <Button color="success">
                <h3 style={{mr: "5px", fontFamily: "Poppins"}}>{authState.user.username}</h3>
              </Button>
              {
                matches ?
                <>
                  <IconButton LinkComponent={Link} to='/wishlist' sx={{mr: "5px"}}>
                  <Badge badgeContent={0} color="primary">
                    <Favorite color='secondary' w={8} />
                  </Badge>
                  </IconButton>
                  <IconButton LinkComponent={Link} to='/cart' sx={{mr: "5px"}}>
                    <Badge badgeContent={0} color="primary">
                      <ShoppingBag color='secondary' w={8} />
                    </Badge>
                  </IconButton>
                </>
                :
                <>

                </>
              }
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Box>
                  {
                    setting === 'Logout' ?
                    <MenuItem key={setting} onClick={() => {
                      handleLogout()
                      handleCloseUserMenu()
                    }}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                    : (
                      setting === 'Your Orders' ?
                      <MenuItem as={Link} to='/orders' key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                      :
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>

                    )
                  }
                  </Box>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
