import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Main from "../pages/default";
import Home from "../pages/home";
import RenwuList from "../pages/renwu";

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routes = [
  {
    path: "/login",
    component: Sandwiches
  },
  {
    path: "/",
    component: ({ routes }) => <Main routes={routes} />,
    routes: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: true,
          title: '主页',
          icon: 'iconshouye2'
        },
        component: () => <Home />,
        children: []
      },
      {
        path: "/rewu",
        name: "rewu",
        meta: {
          hideInMenu: true,
          title: '任务管理',
          icon: 'iconzhangdan'
        },
        component: () => <renwuList />,
        children: [
          {
            path: "/rewu/list",
            name: "list",
            meta: {
              hideInMenu: true,
              title: '任务列表',
              icon: 'iconliebiao2'
            },
            component: () => <RenwuList />,
          }
        ]
      },
    ]
  }
];
class RouteConfigExample extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          {/* <ul>
            <li>
              <Link to="/tacos">Tacos</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul> */}

          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouteConfigExample

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function Sandwiches() {
  return <h2>我是登录页面</h2>;
}