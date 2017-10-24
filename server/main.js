import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

import '../imports/api/users'
import { Links } from '../imports/api/links'
import '../imports/startup/simple-schema-config'

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next)=>{
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })

    link ? (
      res.statusCode = 302,
      res.setHeader('Location', link.url),
      res.end(),
      Meteor.call('links.trackVisit', _id)
    ) : next()
  })


  // // Set HTTP status code
  // res.statusCode = 404
  // // Set HTTP headers
  // res.setHeader('my-custom-header','benjamin was here')
  // // Set HTTP body
  // //res.write('<h1></h1>')
  // // End HTTP request
  // res.end()
})
