import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './style/style.css'
import Home from './page/Home';
import Register from './page/subPage/register';
import Desk from './page/subPage/desk';
import Dashboard from './component/dashboard';
import Assembly from './component/majmae';
import Company from './page/company';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/company' element={<Company />}/>
        <Route path='/desk' element = {<Desk/>}>
          <Route path='dashboard' element = {<Dashboard/>}></Route>  
          <Route path='assembly' element = {<Assembly/>}></Route>  
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
