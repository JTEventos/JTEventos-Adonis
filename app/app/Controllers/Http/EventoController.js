'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Evento = use('App/Models/Evento')

class EventoController {

    async listar({view, session, response}) {
        LoginController.logado(session, response)

        const eventos = await Evento.all()

        // const eventos = await Evento.query('eventos as e')
        //     .innerJoin('clientes as c', 'id_cliente', 'c.id')
        //     .orderBy('data_inicio', 'desc')
        // .fetch()

        return view.render('eventos/listar', { eventos: eventos.toJSON() })
    }

    async cadastrar({view}) {
      return view.render('eventos/cadastrar')
    }

    async salvar({params, request, response, session}) {
      let evento = new Evento()

      if (params.id) {
        evento = await Evento.find(params.id)
      }

      evento.id_cliente = request.input('cliente')
      evento.nome_evento = request.input('nome')
      evento.data_inicio = request.input('dt_ini')
      evento.data_fim = request.input('dt_fim')
      evento.lista_convidados = request.input('convidados')

      await evento.save()

      if (params.id) {
        session.flash({notificacao: 'Evento alterado com sucesso!'})
      } else {
        session.flash({notificacao: 'Evento cadastrado com sucesso!'})
      }

      return response.redirect('/eventos')
    }

    async deletar({params, session, response}) {
        const evento = await Evento.find(params.id)
        await evento.delete()
        session.flash({notificacao: 'Evento removido com sucesso!'})
        return response.redirect('back')
    }

    async alterar({ params, view }) {
      const evento = await Evento.find(params.id)

      return view.render('eventos/alterar', { evento: evento.toJSON() })
    }

}

module.exports = EventoController
