import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Court from "./components/Court";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:id" render={() => <Court />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
