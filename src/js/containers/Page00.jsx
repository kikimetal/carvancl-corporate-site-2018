import React from "react"
import { connect } from "react-redux"

// containers
import ConnectedLink from "./ConnectedLink"
import News from "./News"
import Footer from "./Footer"

// components
import CvlHand from "../components/CvlHand"
import Btn from "../components/Btn"
import LazyLoadImg from "../components/LazyLoadImg"


class Page00 extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="Page00 page">

        <CvlHand />

        <h1 className="page-title">{this.props.routes.page00.heading}</h1>

        <News />

        <section>
          <h1>CVL の価値観 Value</h1>
          <h2>新しい「解釈」と新しい「翻訳」こそに美しさがある</h2>
          <ul>
            <li>「儲かるから」で判断しない: 興奮しない</li>
            <li>「皆がそう言うから」「皆から同意を得やすいから」で判断しない: 流されない</li>
            <li>解釈が更新されていない「慣習」を否定: 嫌悪する</li>
            <li>動くお金の大きさではなく、生じる感動の大きさを大切にする（に、影響される）</li>
            <li>誰も見たことがない、感じたことがないものを生み出すことに強い興奮を覚える</li>
            <li>少数派（社会的弱者）の味方ではない。特定の社会問題を解決したいという欲求もない。社会貢献をしたいと思って事業をしている訳ではない。</li>
            <li>解釈が深い（上質な）人間の味方であり、飛躍した翻訳をしようとしている人間の味方である。</li>
            <li>上質な解釈を持っている人間が、翻訳する力（その解釈を伝達する力）を持たずにクリエイターとしての死を迎えるのを何よりも悲しむ</li>
            <li>周りを良いクリエイター（ = CVL にとっての仲間 ）に囲まれている時が最も安心し、楽しんでいる。</li>
            <li>良いクリエイター（仲間）が蔑ろにされた時（報酬が適切でない、チャンスが与えられないetc...）に強く憤る。</li>
          </ul>
        </section>

        <Footer />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  routes: state.routes,
})

export default connect(mapStateToProps)(Page00)
