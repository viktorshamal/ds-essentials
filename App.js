import React from "react";
import { Router, Route, browserHistory, Link } from "react-router";
import {
  createApp,
  createContainer,
  query,
  BodyRenderer
} from "@phenomic/preset-react-app/lib/client";

import HomeContainer from './Home'
import BlogPostContainer from './BlogPost'

const routes = () =>  
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer} />
    <Route path="/blog/*" component={BlogPostContainer} />
  </Router>

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
