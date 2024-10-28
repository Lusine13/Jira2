//import { Login, Register } from './pages/auth';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import { useState, useEffect } from 'react';
import MainLayout from './components/layouts/Main';
import Profile from './pages/profile';
import LoadingWrapper from './components/sheard/LoadingWrapper';
import { getDoc, doc } from 'firebase/firestore';
import Cabinet from './pages/cabinet';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { FIRESTORE_PATH_NAMES, ROUTE_CONSTANTS } from './core/utils/constants'; 
import { auth, db } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from './context/authContext';
import CabinetLayout from './components/layouts/Cabinet';

import './styles/global.css';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userProfileInfo, setUserProfileInfo] = useState({})

    const handleGetUserData = async (uid) => {
        const docRef =  doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);
        const response = await getDoc(docRef);

        if (response.exists()) {
            setUserProfileInfo(response.data())
        }
    }
    
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            user?.uid && handleGetUserData(user.uid);
            
            setLoading(false);
            setIsAuth(Boolean(user));
        });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, userProfileInfo }}>
        <LoadingWrapper loading={loading}>
        <RouterProvider
         router={
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<MainLayout />}>
                      <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth}/>}/>
                      <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />}/>
                      
                      {/* Cabinet Layout Route */}
                    <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN}/>}>
                    <Route path={ROUTE_CONSTANTS.PROFILE} element={<Profile/>}/>

                      </Route>
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