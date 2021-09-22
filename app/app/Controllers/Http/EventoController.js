'use strict'

const LoginController = require('./LoginController')

class EventoController {
    
    async listarEventos({view, session, response}) {
        LoginController.logado(session, response)
        
        return view.render('evento')
    }


}

module.exports = EventoController
