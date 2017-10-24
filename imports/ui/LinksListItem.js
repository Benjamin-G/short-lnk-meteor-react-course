import React from 'react'
import { Meteor } from 'meteor/meteor'
import Clipboard from 'clipboard'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class LinksListItem extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      justCopied: false
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)

    this.clipboard.on('success', ()=> {
      this.setState({justCopied: true})

      setTimeout(()=>this.setState({justCopied: false}), 500)
    })
    .on('error', ()=>alert('you have an error'))
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  justCopied() {
    return this.state.justCopied ? "Copied" : "Copy"
  }

  isVisible(){
    return this.props.visible ? "Hide" : "Unhide"
  }

  renderStats(){
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits'
    let visitedMessage = null

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage =`(visited ${ moment(this.props.lastVisitedAt).fromNow()})`
    }

    return <p className="item__message item__message-stats">
      {this.props.visitedCount} {visitMessage} {visitedMessage}</p>
  }

  render() {
    return(
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link"
          href={this.props.shortUrl} target="_blank">
          Visit</a>
        <button className="button button--pill"
          ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.justCopied()}</button>
        <button className="button button--pill"
           onClick={()=>{
          Meteor.call('links.setVisibility', this.props._id,
           !this.props.visible)
        }}>
          {this.isVisible()}</button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  url : PropTypes.string.isRequired,
  shortUrl : PropTypes.string.isRequired,
  _id : PropTypes.string.isRequired,
  userId : PropTypes.string.isRequired,
  visible : PropTypes.bool.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
}
