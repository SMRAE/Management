import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn';
import Logout from './components/Logout';
import {Employee} from './components/Employee';
import {Department} from './components/Department';

import jwtDecode from 'jwt-decode';
//import NavBar from './components/NavBar'; 
import AppBarDrawer from './components/AppBarDrawer';

function App() {

  const [user, setUser] = useState({});

  useEffect(() => {   
    function getuser(){
      try {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);       
        setUser(user);          
      } catch (error) {}
    }
    getuser();
  }, [])

  return (    
    <BrowserRouter>   
    <div className="App">
      <Switch>        
        <Route path='/home' render={props =>
            <AppBarDrawer user={ user } />
         } /> 
          <Route path='/department' component={Department}/>
         <Route path='/employee' component={Employee}/> 
        <Route path='/logout' component={Logout} /> 
        <Route path='/' component={LogIn} />  
                      
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
