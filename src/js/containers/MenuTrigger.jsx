import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

// container
import ConnectedLink from "./ConnectedLink"

class MenuTrigger extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className={`MenuTrigger ${this.props.mobileMenuContext || this.props.isPageMoving ? "collapse" : ""}`}>
        <div className="left-item" onClick={this.props.toggleMobileMenu}>
          {/*<img className="icon-img" src={`${window.__ASSETS__}/img/home-icon.svg`} />*/}
          <i className="fas fa-bars"></i>
          <span>MENU</span>
          {/*<span className="text">MENU</span>*/}
        </div>
        {
          this.props.location.pathname === "/"
            ? <ConnectedLink className="right-item" to="/why/"><i className="fas fa-chevron-right"></i>なぜやるか？</ConnectedLink>
            : this.props.location.pathname === "/why/"
              ? <ConnectedLink className="right-item" to="/how/"><i className="fas fa-chevron-right"></i>どんなサービス？</ConnectedLink>
              : <ConnectedLink className="right-item" to="/"><i className="fas fa-chevron-right"></i>HOMEへ</ConnectedLink>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isPageMoving: state.isPageMoving,
  mobileMenuContext: state.mobileMenuContext,
})

import * as action from "../modules/action"
const mapStateToDispatch = dispatch => ({
  toggleMobileMenu: () => dispatch(action.toggleMobileMenu()),
})

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(MenuTrigger))
