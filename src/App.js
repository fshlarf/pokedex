import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import Error from './pages/Error/Error'
import Detail from './pages/Detail/Detail'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/detail/:id" component={Detail} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
