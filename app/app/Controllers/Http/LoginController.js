'use strict'

class LoginController {
    async index({view, session}) {
        let username = session.get('username')
        return view.render('login', {user: username})
    }

    async login({response, session}) {
        session.put('username', 'Fulano')
        response.redirect('back')
    }

    async logout({response, session}) {
        let username = session.get('username')
        if(username) {
            session.clear();
        }
        response.redirect('back')
    }
}

module.exports = LoginController
