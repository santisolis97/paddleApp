import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Court from "./components/Court";
import AddCourtModal from "./components/AddCourtModal";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/court/:id" render={() => <Court />} />
          <Route path="/AddCourt" exact render={() => <AddCourtModal />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
