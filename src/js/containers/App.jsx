import React from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import urljoin from "url-join"

// containers
import MyHelmet from "./MyHelmet"
import Page00 from "./Page00"
import Page01 from "./Page01"
import Page02 from "./Page02"
import Menu from "./Menu"
import LightsSvg from "./LightsSvg"

// components
import Btn from "../components/Btn"
import NotFound from "../components/NotFound"
// import KikiStar from "../components/KikiStar"

// loader events
window.addEventListener("load", () => {
  // let bg = document.getElementById("loader")
  // bg.classList.add("loader-fade-out")
  let app = document.querySelector(".App")
  app.classList.add("app-fade-in")
})

class App extends React.Component{
  constructor(props) {
    super(props)
    this.props.setWindowSize()
  }

  componentDidMount(){
    window.addEventListener("resize", this.props.setWindowSize)
    this.props.setWindowSize()
    this.props.getNews()
    this.props.getStory()
    this.props.getService()
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.props.setWindowSize)
  }

  render(){
    return (
      <div className="App">

        {/* 一度遷移シーンの画像をキャッシュしておくと、表示に遅延が発生しない */}
        <img style={{display: "none"}} src={urljoin(this.props.assetsPath, "img/bg.jpg")} />

        <div className={`page-transition-image ${this.props.isPageMoving ? "on" : "off"}`}>
          <div className="bg" style={{
              backgroundImage: `url(${urljoin(this.props.assetsPath, "img/bg.jpg")})`,
            }}></div>
        </div>

        <main
          className={`main ${this.props.windowSize || "noSetWindowSize"}`}
          >
          <Switch>
            <Route exact path={this.props.routes.page00.uri} component={Page00} />
            <Route exact path={this.props.routes.page01.uri} component={Page01} />
            <Route exact path={this.props.routes.page02.uri} component={Page02} />
            <Route component={NotFound} />
          </Switch>
        </main>

        <nav className="nav">
          <Menu/>
        </nav>

        {/*<LightsSvg />*/}

        <MyHelmet />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  windowSize: state.windowSize,
  isPageMoving: state.isPageMoving,
  routes: state.routes,
  assetsPath: state.assetsPath,
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  setWindowSize: () => dispatch(action.setWindowSize()),
  getNews: () => dispatch(action.getNews()),
  getStory: () => dispatch(action.getStory()),
  getService: () => dispatch(action.getService()),
})

// withRouter かまさないと、ページ遷移うまくいかないのだけど、理由が不明...
export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App))
