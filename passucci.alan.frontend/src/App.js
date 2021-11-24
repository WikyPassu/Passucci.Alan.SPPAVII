import 'bulma/css/bulma.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Home from './pages/Home';
import Detalle from './pages/Detalle';
import Error404 from './pages/Error404';
import Animales from './pages/Animales';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/registrarse" component={Registro}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/mascota/:id" component={Detalle}/>
        <Route exact path="/animales/:tipo" component={Animales}/>
        <Route exact path="*" component={Error404}/>
      </Switch>
    </Router>
  );
};

export default App;
