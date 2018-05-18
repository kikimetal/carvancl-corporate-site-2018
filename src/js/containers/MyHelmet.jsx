import React from "react"
import Helmet from "react-helmet"
import { connect } from "react-redux"
// components
import ScrollToTopOnMount from "../components/ScrollToTopOnMount"
// functions
import { getObjectFromJSON } from "../functions/getJSON"

// // グローバルオブジェクトにセットされてるルーティング情報を取得
// const ROUTES = window.__ROUTES__
// // 存在すれば path を、しなければ ルートの情報 を返す。
// // 引数の path が 存在するか確認。
// const checkRoute = path => {
//   const route = Object.keys(ROUTES).find(route => route === path) || false
//   return route ? ROUTES[route] : ROUTES["/"]
// }

// new logic
// グローバルオブジェクトにセットされてるルーティング情報を取得
const ROUTES = window.__ROUTES__
// 引数の path が 存在するか確認。成功でルートのmeta情報を返す。
const checkRoute = path => {
  const keyArr = Object.keys(ROUTES) // key の配列を生成 // ["page00", "page01", ...]
  const matchRoute = keyArr.find(key => ROUTES[key].uri === path) || false
  return matchRoute ? ROUTES[matchRoute] : ROUTES["page00"]
}

const MyHelmet = ({ currentPath, windowSize }) => {
  console.log(currentPath)
  const thisRoute = checkRoute(currentPath)
  console.log("MyHelmet thisRoute uri: ", thisRoute.uri)
  return (
    <div className="MyHelmet">

      {/*{windowSize === "sm" && <ScrollToTopOnMount />}*/}
      <ScrollToTopOnMount />

      <Helmet>
        <title>{thisRoute.title}</title>
        <meta name="description" content={thisRoute.description} />
        <link rel="canonical" href={thisRoute.canonical} />
      </Helmet>
    </div>
  )
}

const mapStateToProps = state => ({
  currentPath: state.router.location.pathname,
  windowSize : state.windowSize,
})

export default connect(mapStateToProps)(MyHelmet)
