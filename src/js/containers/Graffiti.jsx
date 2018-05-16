import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

// components
import Btn from "../components/Btn"
import LazyLoadImg from "../components/LazyLoadImg"

const Graffiti = ({ ww, wh }) => (
  <div className="Graffiti page">

    <h1 className="page-title">Graffiti</h1>

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
      <h1>LINKS</h1>
      <ul className="link-list" style={{padding: "60px 0"}}>
        <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Home</Btn></NavLink></li>
        <li className="link-list-item"><NavLink exact to="/graffiti"><Btn><i className="fab fa-accusoft" />Graffiti</Btn></NavLink></li>
        <li className="link-list-item"><NavLink to="/website"><Btn><i className="fas fa-code" />WebSite</Btn></NavLink></li>
      </ul>
    </section>


    <section>
      <h1>TEST</h1>
      <h2>ww: {ww}</h2>
      <h2>wh: {wh}</h2>
      <h2>window.orientation: {window.orientation}</h2>
    </section>

    <h1 className="page-title">Graffiti</h1>

  </div>
)

const mapStateToProps = state => ({
  ww: state.windowWidth,
  wh: state.windowHeight,
})

export default connect(mapStateToProps)(Graffiti)
