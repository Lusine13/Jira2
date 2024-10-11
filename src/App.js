import Register from './pages/register';
import MainLayout from './components/layouts/Main';
import Login from './pages/login';
import './styles/global.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ROUTE_CONSTANTS } from './components/core/utils/constants';

const App = () => {
    return (
        <RouterProvider
         router={
            createBrowserRouter(
                createRoutesFromElements(
                    <Route path="/" element={<MainLayout />}>
                      <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />}/>
                      <Route path={ROUTE_CONSTANTS.REGISTER} element={<Register />}/>
                    </Route>

                )
            )
         }
         />
    )
};

export default App;