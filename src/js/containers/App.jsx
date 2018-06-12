import React from "react"
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom"
import { connect } from "react-redux"

// router switch transition
// import { spring, AnimatedSwitch } from "react-router-transition"

// scroll animation
import { animateScroll } from "react-scroll"
// onSwipe onTap
import ReactTouchEvents from "react-touch-events"

// containers
import MyHelmet from "./MyHelmet"
import Page00 from "./Page00"
import Page01 from "./Page01"
import Page02 from "./Page02"
import Menu from "./Menu"
import LightsSvg from "./LightsSvg"

// components
import Btn from "../components/Btn"
import Bg from "../components/Bg"
import NotFound from "../components/NotFound"
import KikiStar from "../components/KikiStar"

// loader events
window.addEventListener("load", () => {
  let bg = document.getElementById("loader")
  bg.classList.add("loader-fade-out")
  let app = document.querySelector(".App")
  app.classList.add("app-fade-in")
})

class App extends React.Component{
  constructor(props) {
    super(props)
    this.props.setWindowSize()
    // this.pageMoveTo = this.pageMoveTo.bind(this)
    // this.state = {
    //   pathname: this.props.router.location.pathname,
    //   isPageMoving: true,
    // }
  }

  // componentWillUpdate(){
  // componentWillReceiveProps(nextProps){
  //   if (nextProps.router.location.pathname !== this.props.router.location.pathname) {
  //     this.pageMoveTo(nextProps.router.location.pathname)
  //     console.log(nextProps.router.location.pathname)
  //   }
  // }

  // pageMoveTo(nextPath){
  //   setTimeout(() => this.setState({ isPageMoving: false }), 1800)
  //   this.setState({
  //     pathname: nextPath,
  //     isPageMoving: true,
  //   })
  // }

  componentDidMount(){
    this.props.setWindowSize()
    window.addEventListener("resize", this.props.setWindowSize)

    // setTimeout(() => this.setState({ isPageMoving: false }), 1800)
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.props.setWindowSize)
  }

  // toTop(){
  //   animateScroll.scrollToTop({
  //     duration: window.pageYOffset / 2.6,
  //     smooth: "ease",
  //   })
  // }

  render(){
    return (
      <div className="App">

        <div
          className={`pageBgImg ${this.props.isPageMoving ? "on" : "off"}`}
          style={{
            backgroundImage: `url(${window.__ASSETS__}/img/king-kitan.jpg)`,
          }}>{this.props.shortMessage}</div>

        <main
          className={`main ${this.props.windowSize}`}
          >
          <Switch>
            <Route exact path="/" component={Page00} />
            <Route exact path="/why/" component={Page01} />
            <Route path="/how/" component={Page02} />
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
  // windowHeight: state.windowHeight,
  isPageMoving: state.isPageMoving,
  moveToPathname: state.moveToPathname,
  shortMessage: state.shortMessage,
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  setWindowSize: () => dispatch(action.setWindowSize()),
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App))
