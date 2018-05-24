import React from "react"
import { connect } from "react-redux"

import { withRouter } from 'react-router-dom'

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class ConnectedLink extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    const { history, replace, to, duration } = this.props

    // 現在のページかどうか
    let {className} = this.props
    className += history.location.pathname === to ? " active" : ""

    // warnig 原因の staticContext を切り取り
    let {staticContext, ...inheritProps} = this.props
    // className 合成
    inheritProps = {
      ...inheritProps,
      className,
    }

    const handleClick = e => {
      if (this.props.onClick) this.props.onClick(e);

      if (
        !e.defaultPrevented && // onClick prevented default
        e.button === 0 && // ignore everything but left clicks
        !this.props.target && // let browser handle "target=_blank" etc.
        !isModifiedEvent(e) // ignore clicks with modifier keys
      ) {
        e.preventDefault();

        setTimeout(() => {
          replace ? history.replace(to) : history.push(to)
        }, duration)
      }

      const thisPage = document.querySelector(".page")
      thisPage.classList.add("leave")
    }

    return (
      <a {...inheritProps} onClick={handleClick}>{this.props.children}</a>
    )
  }
}

ConnectedLink.defaultProps = {
  to: "/",
  duration: 500,
}

// const mapStateToProps = state => ({
//   // router: state.router,
// })
// export default withRouter(connect()(ConnectedLink))
export default withRouter(ConnectedLink)
