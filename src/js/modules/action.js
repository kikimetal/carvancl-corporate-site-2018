export const setWindowSize = () => {
  return (dispatch) => {

    const width = window.innerWidth
    const height = window.outerHeight
    ? window.innerHeight
    : window.orientation
    ? screen.width
    : screen.height
    // 肝心な部分。iOS:safari では outerHeight == 0

    dispatch({
      type: "SET_WINDOW_WIDTH",
      width,
    })

    dispatch({
      type: "SET_WINDOW_HEIGHT",
      height,
    })

    let size
    if (width < 768) {
      size = "sm"
    } else if (width < 1240) {
      size = "md"
    } else if (width < 1900) {
      size = "lg"
    } else {
      size = "xl"
    }

    dispatch({
      type: "SET_WINDOW_SIZE",
      size,
    })
  }
}

export const reverseWebsite = () => ({
  type: "REVERSE_WEBSITE",
})

export const setWebsitesDataCondition = condition => ({
  type: "SET_WEBSITES_DATA_CONDITION",
  condition,
})

export const setWebsitesData = data => ({
  type: "SET_DATA",
  data,
})

export const setWpData = data => ({
  type: "SET_WP_DATA",
  data,
})

// import { push } from "react-router-redux"
// export const delayPush = (to, duration) => {
//   duration = duration || 500
//   return (dispatch) => {
//     setTimeout(() => dispatch(push({pathname: to})), duration)
//     // document.querySelector(".page").classList.add("leave")
//   }
// }


// fetch ---
// TODO
// export const fetchJSON = (url, ...actions) => {
//   return (dispatch) => {
//     fetch(url)
//       .then((response) => {
//         if(!response.ok) {
//           throw Error(response.statusText);
//         }
//         dispatch(loadComments(false));
//
//         return response;
//       })
//       .then((response) => response.json())
//       .then((comments) => dispatch(fetchCommentsSuccess(comments)))
//       .catch(() => dispatch(getCommentsError(true)));
//   }
// }

const ROUTES = window.__ROUTES__
// 引数の path が 存在するか確認。route情報を返す。
const checkRoute = path => {
  const keyArr = Object.keys(ROUTES) // key の配列を生成 // ["page00", "page01", ...]
  const matchRoute = keyArr.find(key => ROUTES[key].uri === path) || false
  return matchRoute ? ROUTES[matchRoute] : ROUTES["page00"]
}

export const pageMoveToPathname = (nextPath) => {

  // console.log("w-l-p", window.location.pathname)
  // console.log("nextPath", nextPath)
  if (window.location.pathname === nextPath) return false

  return (dispatch) => {
    dispatch({
      type: "SET_MOVE_TO_PATHNAME",
      nextPath,
    })

    dispatch({
      type: "PAGE_MOVING",
    })

    setTimeout(() => dispatch({ type: "PAGE_MOVED" }), 1800)

    const nextRoute = checkRoute(nextPath)
    dispatch({
      type: "SET_NEXT_PAGE_SHORT_MESSAGE",
      shortMessage: nextRoute.shortMessage,
    })
  }
}

// mobile menu show / hide
export const toggleMobileMenu = (context) => {
  return (dispatch, getState) => {
    dispatch({
      type: "SET_MOBILE_MENU_CONTEXT",
      context: !getState().mobileMenuContext,
    })
  }
}
