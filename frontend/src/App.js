import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from './components/LogIn';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path='/' component={LogIn} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
