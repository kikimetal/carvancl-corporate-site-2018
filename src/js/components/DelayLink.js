import React from 'react'

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class DelayLink extends React.Component{
  constructor(props){
    super(props)
    // this.handleClick = this.handleClick.bind(this)
  }

  // handleClick(e){
  //   if (this.props.onClick) this.props.onClick(e);
  //
  //   if (
  //     !e.defaultPrevented && // onClick prevented default
  //     e.button === 0 && // ignore everything but left clicks
  //     !this.props.target && // let browser handle "target=_blank" etc.
  //     !isModifiedEvent(e) // ignore clicks with modifier keys
  //   ) {
  //     e.preventDefault();
  //
  //     const { history } = this.context.router;
  //     const { replace, to } = this.props;
  //
  //     if (replace) {
  //       history.replace(to);
  //     } else {
  //       history.push(to);
  //     }
  //   }
  //
  //   // document.querySelector(".page").classList.add("leave")
  // }

  render(){
    // const to = this.props.to
    // const delayJump = (e) => {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   setTimeout(()=>{
    //     if (this.props.newWindow){
    //       window.open(to)
    //     }else{
    //       location.href = to
    //     }
    //   }, this.props.duration)
    // }


    const handleClick = e => {
      if (this.props.onClick) this.props.onClick(e);

      if (
        !e.defaultPrevented && // onClick prevented default
        e.button === 0 && // ignore everything but left clicks
        !this.props.target && // let browser handle "target=_blank" etc.
        !isModifiedEvent(e) // ignore clicks with modifier keys
      ) {
        e.preventDefault();

        const { history } = this.context.router;
        const { replace, to } = this.props;

        if (replace) {
          history.replace(to);
        } else {
          history.push(to);
        }
      }

      // document.querySelector(".page").classList.add("leave")
    }


    return (
      <a {...this.props} onClick={handleClick}>{this.props.children}</a>
    )
  }
}
DelayLink.defaultProps = {
  to: "/",
  duration: 500,
  // duration: 5000,
  // newWindow: false,
}
