import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import EmployeePage from './Pages/EmployeePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <EmployeePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
