import React from "react"

const MenuTrigger = ({ collapse }) => (
  <div className={`MenuTrigger ${collapse && "collapse"}`}>
    <img className="icon-img" src={`${window.__ASSETS__}/img/home-icon.svg`} />
  </div>
)

export default MenuTrigger
