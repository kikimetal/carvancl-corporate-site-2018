import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class News extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getNewsData()
  }
  render(){
    const { status, data } = this.props.newsData

    let content = (<div className="news-content"></div>)
    if (status === "fulfilled") {
      content = (
        <div className="news-content">
          {data.map((rowData, i) => {
            return (
              <section className="news-content-row" key={"news-data-row-" + i}>
                <div className="date">{rowData.date}</div>
                <img
                  className="img"
                  src={rowData["img-src"]}
                  alt={rowData["img-alt"]}
                  />
                <h2 className="title">{rowData.title}</h2>
                <p className="description">{rowData["description"]}</p>
                {rowData["link-flg"] &&
                  <a className="link-btn" href={rowData["link-href"]}>
                    <i className="fas fa-chevron-right"></i>{rowData["link-text"]}
                  </a>}
              </section>
            )
          })}
        </div>
      )
    }

    const notificationPending = (
      <h2 className="notification pending skeleton-screen-load">
        <span>
          <q>最新のニュース</q>を読み込んでいます。
        </span>
      </h2>
    )
    const notificationError = (
      <h2 className="notification error">
        <span>
          サーバーへの通信に失敗したため<q>最新のニュース</q>が読み込めませんでした。
        </span>
      </h2>
    )

    return (
      <div className="News">
        {
          this.props.newsData.status === "fulfilled"
            ? content
            : this.props.newsData.status === "pending"
              ? notificationPending
              : notificationError
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  newsData: state.newsData,
})

import * as action from "../modules/action"
const mapDispatchToProps = dispatch => ({
  getNewsData: () => dispatch(action.getNewsData()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News))
