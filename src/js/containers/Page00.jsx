import React from "react"
import { connect } from "react-redux"
import { Link, NavLink, withRouter } from "react-router-dom"

// containers
import ConnectedLink from "./ConnectedLink"

// components
import Bg from "../components/Bg"
import KikiStar from "../components/KikiStar"
import Btn from "../components/Btn"
import LazyLoadImg from "../components/LazyLoadImg"
import DelayLink from "../components/DelayLink"

const Page00 = props => (
  <div className="Page00 page">

    <h1 className="page-title">Page00</h1>

    <LazyLoadImg className="first-view"
      imgsrc={`${window.__ASSETS__}/img/twin-ribon-girl-none.png`}
      minHeight="50vh"
      />
    <LazyLoadImg className="first-view"
      imgsrc={`${window.__ASSETS__}/img/wa-maid.jpg`}
      minHeight="50vh"
      />
    <LazyLoadImg className="first-view"
      imgsrc={`${window.__ASSETS__}/img/nurse-rip.jpg`}
      minHeight="50vh"
      />

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


    <section>
      NAV LINK
      <ul className="link-list" style={{padding: "60px 0"}}>
        <li className="link-list-item"><NavLink exact to="/"><Btn><i className="fas fa-bug" />Page00</Btn></NavLink></li>
        <li className="link-list-item"><NavLink exact to="/why/"><Btn><i className="fab fa-accusoft" />Page01</Btn></NavLink></li>
        <li className="link-list-item"><NavLink to="/how/"><Btn><i className="fas fa-code" />Page02</Btn></NavLink></li>
      </ul>
    </section>

    <section>
      LINK
      <ul className="link-list" style={{padding: "60px 0"}}>
        <li className="link-list-item"><Link exact="true" to="/"><Btn><i className="fas fa-bug" />Page00</Btn></Link></li>
        <li className="link-list-item"><Link exact="true" to="/why/"><Btn><i className="fab fa-accusoft" />Page01</Btn></Link></li>
        <li className="link-list-item"><Link to="/how/"><Btn><i className="fas fa-code" />Page02</Btn></Link></li>
      </ul>
    </section>

    <section>
      DELAY LINKS
      <ul className="link-list" style={{padding: "60px 0"}}>
        <li className="link-list-item"><DelayLink to="/"><Btn><i className="fas fa-bug" />Page00</Btn></DelayLink></li>
        <li className="link-list-item"><DelayLink to="/why/"><Btn><i className="fab fa-accusoft" />Page01</Btn></DelayLink></li>
        <li className="link-list-item"><DelayLink to="/how/"><Btn><i className="fas fa-code" />Page02</Btn></DelayLink></li>
      </ul>
    </section>
    <section>
      delay push
      <ul className="link-list" style={{padding: "60px 0"}}>
        <li><Btn onClick={() => props.delayPush("/why/", 0)}><i className="fas fa-bug" />Page01</Btn></li>
        <li><Btn onClick={() => props.delayPush("/why/", 2000)}><i className="fas fa-bug" />Page01</Btn></li>
      </ul>
    </section>
    <section>
      withRouter props.history
      <ul className="link-list" style={{padding: "60px 0"}}>
        <li><Btn onClick={() => props.history.push("/why/")}><i className="fas fa-bug" />Page01</Btn></li>
      </ul>
    </section>
    <section>
      ConnectedLink
      <ConnectedLink to="/why/"><Btn>ConnectedLink</Btn></ConnectedLink>
    </section>

    <h1 className="page-title">Page00</h1>

  </div>
)

// export default Page00
const mapStateToProps = state => ({
  windowSize: state.windowSize,
  router: state.router,
})
// export default connect(mapStateToProps)(Page00)

// modules
import * as action from "../modules/action"
const mapDispatchToProps = dispatch => ({
  delayPush: (to, duration) => dispatch(action.delayPush(to, duration)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page00))
