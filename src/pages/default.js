import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";
import style from './index.module.scss'
import { Dropdown, Menu, Card } from "element-react";
import { withRouter } from "react-router-dom";
// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
function menuGroup(props) {
  return (
    <Menu.SubMenu index={props.path} title={<span className={style.iconBox}><i style={{ marginRight: '5px' }} className={`iconfont ${props.meta.icon}`}></i>{props.meta.title}</span>} key={props.path}>
      {props.children.map(e => menuitem(e))}
    </Menu.SubMenu>
  )
}
function menuitem(props) {
  return (
    <Menu.Item index={props.path} key={props.path}><i style={{ marginRight: '5px' }} className={`iconfont ${props.meta.icon}`}></i>{props.meta.title}</Menu.Item>
  )
}
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSide: []
    }
  }
  componentDidMount() {
    this.setState({
      menuSide: this.props.routes
    })
  }
  handleClick(e) {
    this.props.history.push(e)
  }
  render() {
    return (
      <Menu className={style.menu} theme="dark" onSelect={(e) => this.handleClick(e)}>
        {this.state.menuSide.map(e => {
          if (e.children.length > 0) {
            return menuGroup(e)
          }
          return menuitem(e)
        })}
      </Menu>
    )
  }
}
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const route = []
    this.props.routes.forEach(e => {
      if (e.children.length > 0) {
        e.children.forEach(j => {
          route.push(j)
        })
      } else {
        route.push(e)
      }
    })
    return (
      <div className={style.default}>
        <div className={style.head}>
          <div className={style.logoBox}>
            <img className={style.logo} src={require('../assets/images/logo.png')} alt="" />
          </div>
          <div className={style.topMenu}>
            <div className={style.userAvator}>
              <div className={style.item}>
                <Dropdown trigger="click" menu={(
                  <Dropdown.Menu>
                    <Dropdown.Item>个人信息</Dropdown.Item>
                    <Dropdown.Item>账号设置</Dropdown.Item>
                    <Dropdown.Item>意见反馈</Dropdown.Item>
                    <Dropdown.Item divided>退出登录</Dropdown.Item>
                  </Dropdown.Menu>
                )}
                >
                  <div className={style.Avatar}>
                    <img className="el-dropdown-link" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3181978610,3463074430&fm=26&gp=0.jpg" alt="" />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className={style.defaultBody}>
          <div className={style.nav}>
            <Nav routes={this.props.routes} history={this.props.history} />
          </div>
          <div className={style.defaultView}>
            <Card style={{ flex: 1, boxShadow: "none" }} bodyStyle={{ padding: 10 }}>
              <Switch>
                {route.map((route, i) => (
                  <Route
                    path={route.path}
                    render={e => (
                      // pass the sub-routes down to keep nesting
                      <route.component {...e} routes={route.routes}
                      />
                    )}
                    key={i}
                  />
                ))}
              </Switch>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Main)
