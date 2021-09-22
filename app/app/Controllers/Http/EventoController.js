'use strict'

class EventoController {
    
    async listarEventos({view}) {
        return view.render('evento')
    }


}

module.exports = EventoController
