import Register from './pages/register';
import Header from './components/global/Header';
import Login from './pages/login';
import './styles/global.css';
const App = () => {
    return (
        <div id='divContainer'>
            <Header />
            <Register />
            <hr/>
            <Login />
        </div>
    )
};

export default App;