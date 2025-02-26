import { Routes, Route, Link , Navigate , Outlet , useNavigate } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import Home from '../components/Home';

// import { } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import  { useState , useEffect} from 'react';

const PrivateRoutes = ()=>{
  const auth = localStorage.getItem('token');
  return (
    auth ? <Outlet/> : <Navigate to ='/' />
  )

}

function UserRoutes() {
  const navigate = useNavigate();
  const [isAuth , setIsAuth] = useState(!!localStorage.getItem('token'));

  // ✅ Ensure Auth state updates when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    setIsAuth(false);
    navigate('/');
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {!isAuth ? (
              <>
              
            <Button color="inherit">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'white' }}>Sign In</Typography>
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'white' }}>Sign Up</Typography>
              </Link>
            </Button>
            </>
            )
      :
           (
            <>
            <Button color="inherit">
              <Link to="/home" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'white' }}>Home</Typography>
              </Link>
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            </>
           )
}
          </Toolbar>
        </AppBar>
      </Box>
      {/* <nav sx={{ backgroundColor: 'Black', }}>
        <Link to='/'>Sign In</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/home'>Home</Link>
      </nav> */}
      <Routes>
        <Route path='/' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/home' element={<PrivateRoutes/>}>
        <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default UserRoutes
