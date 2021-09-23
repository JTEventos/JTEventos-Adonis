'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Evento = use('App/Models/Evento')

class EventoController {
    
    async listar({view, session, response}) {
        LoginController.logado(session, response)
        
        const eventos = await Evento.all();

        return view.render('eventos/listar', { eventos: eventos.toJSON()})
    }

}

module.exports = EventoController
