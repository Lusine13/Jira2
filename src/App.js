//import { Login, Register } from './pages/auth';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { useState, useEffect } from 'react';
import MainLayout from './components/layouts/Main';
import Profile from './pages/profile';
import LoadingWrapper from './components/sheard/LoadingWrapper';
import Cabinet from './pages/cabinet';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { ROUTE_CONSTANTS } from './components/core/utils/constants'; 
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './context/authContext';
import './styles/global.css';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            setIsAuth(Boolean(user));
        })
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, x:10 }}>
        <LoadingWrapper loading={loading}>
        <RouterProvider
         router={
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<MainLayout />}>
                      <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth}/>}/>
                      <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />}/>
                      <Route path={ROUTE_CONSTANTS.CABINET} element={ isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}/> 
                      <Route path={ROUTE_CONSTANTS.PROFILE} element={isAuth ? <Profile /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}/>
                    </Route>
                )
            )
         }
         />
         </LoadingWrapper>
       </AuthContext.Provider>  
    )
};

export default App;