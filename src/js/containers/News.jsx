import React from "react"
import { connect } from "react-redux"

class News extends React.Component{
  constructor(props){
    super(props)
  }
  render(){

    const { status, data } = this.props.news

    let fulfilled

    if (status === "fulfilled") {
      fulfilled = (
        <div className="news-content">
          {data.map((row, i) => {
            return (
              <section className="news-content-row" key={"news-data-row-" + i}>
                <div className="date">{row.date}</div>
                <img
                  className="img"
                  src={row["img-src"]}
                  alt={row["img-alt"]}
                  />
                <h2 className="title">{row.title}</h2>
                <p className="description">{row["description"]}</p>
                {
                  Number(row["link-flg"])
                  ? <a className="link-btn" href={row["link-href"]}>
                      <i className="fas fa-chevron-right"></i>{row["link-text"]}
                    </a>
                  : null
                }
              </section>
            )
          })}
        </div>
      )
    }

    const pending = (
      <h2 className="notification pending skeleton-screen-load">
        <span>
          <q>最新のニュース</q>を読み込んでいます。
        </span>
      </h2>
    )
    const rejected = (
      <h2 className="notification rejected error">
        <span>
          サーバーへの通信に失敗したため<q>最新のニュース</q>が読み込めませんでした。
        </span>
      </h2>
    )

    return (
      <div className="News">
        {
          status === "fulfilled"
            ? fulfilled
            : status === "pending"
              ? pending
              : rejected
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news,
})

export default connect(mapStateToProps)(News)
