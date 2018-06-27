import React from "react"
import { connect } from "react-redux"

const Page02 = props => (
  <div className="Page02 page">
    <h1 className="page-title">{props.routes.page02.heading}</h1>
  </div>
)

const mapStateToProps = state => ({
  routes: state.routes,
  service: state.service,
})

export default connect(mapStateToProps)(Page02)
