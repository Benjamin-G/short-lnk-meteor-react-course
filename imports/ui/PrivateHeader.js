import React from 'react'
import {Accounts} from 'meteor/accounts-base'
import PropTypes from 'prop-types'

const PrivateHeader = (props) => {
  return (
    <div className="title-bar">
      <div className="title-bar__content">
        <h1 className="title-bar__text">{props.title}</h1>
        <button className="button button--link-text"
          onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  )
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader
