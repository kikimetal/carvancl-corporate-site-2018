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
    let content
    if(status === "fulfilled"){
      content = (
        <div>
          {data.map((rowData, i) => {
            return (
              <section key={"news-data-row-" + i}>
                <h2>{rowData.title}</h2>
                <img
                  style={{maxWidth: '90%'}}
                  src={rowData["img-src"]}
                  />
                <p>{rowData["img-alt-text"]}</p>
              </section>
            )
          })}
        </div>
      )
    }else{
      content = (
        <h2>
          {status === "pending"
            ? "ロード中..."
            : "サーバーエラーのため読み込みを中断します"}
          </h2>
        )
      }
      return (
        <div className="News">
          <h1>News</h1>
          {content}
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
