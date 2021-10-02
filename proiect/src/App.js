import './App.css';
import Navigator from './components/Navigator';
import AddEvent from './pages/AddEvent';
import {BrowserRouter}  from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Test from './pages/Test';
function App() {
  return (
    //<Test/>
    <BrowserRouter>
    <Navigator/>
    </BrowserRouter>
  );
}

export default App;
