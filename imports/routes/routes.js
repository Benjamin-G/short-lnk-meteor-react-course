import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import Signup from '../ui/Signup'
import Link from '../ui/Link'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

const onEnterPublicPage = () =>
  Meteor.userId() ? browserHistory.replace('/links') : undefined

const onEnterPrivatePage = () =>
  !Meteor.userId() ? browserHistory.replace('/') : undefined


export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

export const onAuthChange = (isAuthenticated) =>{
  const pathname = browserHistory.getCurrentLocation().pathname
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/')
  }
}
