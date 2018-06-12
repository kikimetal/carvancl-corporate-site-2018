import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

// components
import Btn from "../components/Btn"
import LazyLoadImg from "../components/LazyLoadImg"

const Page01 = (props) => (
  <div className="Page01 page">

    <h1 className="page-title">Page01: WHY</h1>

    <LazyLoadImg
      imgsrc={`${window.__ASSETS__}/img/twin-ribon-girl.png`}
      height="50vh"
      />
    <LazyLoadImg
      imgsrc={`${window.__ASSETS__}/img/wa-maid.jpg`}
      height="50vh"
      />
    <LazyLoadImg
      imgsrc={`${window.__ASSETS__}/img/nurse-rip.jpg`}
      height="50vh"
      />


    <section>
      <h1>TEST</h1>
      {/*<h2>ww: {props.ww}</h2>
    <h2>wh: {props.wh}</h2>*/}
      <h2>window.orientation: {window.orientation}</h2>
    </section>

    <h1 className="page-title">Page01</h1>

  </div>
)

const mapStateToProps = state => ({
  // ww: state.windowWidth,
  // wh: state.windowHeight,
  // redux: state,
})

export default connect(mapStateToProps)(Page01)
