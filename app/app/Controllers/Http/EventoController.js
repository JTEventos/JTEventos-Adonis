'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Evento = use('App/Models/Evento')

class EventoController {
    
    async listar({view, session, response}) {
        LoginController.logado(session, response)
        
        const eventos = await Evento.query('eventos as e')
            .innerJoin('clientes as c', 'id_cliente', 'c.id')
            .orderBy('data_inicio', 'desc')
        .fetch()

        return view.render('eventos/listar', { eventos: eventos.toJSON()})
    }

    async deletar({params, session, response}) {
        const evento = await Evento.find(params.id)
        await evento.delete()
        session.flash({notificacao: 'Evento removido com sucesso!'})
        return response.redirect('back')
    }

}

module.exports = EventoController
