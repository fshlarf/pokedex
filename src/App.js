import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import Error from './pages/Error/Error'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
