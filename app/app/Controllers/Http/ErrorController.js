'use strict'

class ErrorController {
  async 401({ view }) {
    return view.render('error/401')
  }
  async 404({ view }) {
    return view.render('error/404')
  }

}

module.exports = ErrorController
