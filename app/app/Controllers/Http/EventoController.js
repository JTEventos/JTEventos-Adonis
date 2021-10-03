'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Evento = use('App/Models/Evento')
const Cliente = use('App/Models/Cliente')

class EventoController {

  async listar({ view, session, response }) {
    LoginController.logado(session, response)

    const eventos = await Evento.all()

    // const eventos = await Evento.query('eventos as e')
    //     .innerJoin('clientes as c', 'id_cliente', 'c.id')
    //     .orderBy('data_inicio', 'desc')
    // .fetch()

    return view.render('eventos/listar', { eventos: eventos.toJSON() })
  }

  async cadastrar({ view }) {
    const clientes = await Cliente.all()

    return view.render('eventos/cadastrar', { clientes: clientes.toJSON() })
  }

  async salvar({ params, request, response, session }) {
    let evento = new Evento()

    if (params.id) {
      evento = await Evento.find(params.id)
    }

    evento.id_cliente = request.input('cliente')
    evento.nome_evento = request.input('nome')
    evento.data_inicio = request.input('dt_ini')
    evento.data_fim = request.input('dt_fim')
    evento.lista_convidados = request.input('convidados')

    if (request.input('cliente') == null || request.input('nome') == null || request.input('dt_ini') == null || request.input('dt_fim') == null) {
      session.flash({ notificacao: 'Preencha todos os campos obrigatórios antes de salvar o registro.' })
      return response.redirect('back')
    } else {
      await evento.save()

      if (params.id) {
        session.flash({ notificacao: 'Evento alterado com sucesso!' })
      } else {
        session.flash({ notificacao: 'Evento cadastrado com sucesso!' })
      }

      return response.redirect('/eventos')
    }
  }

  async deletar({ params, session, response }) {
    const evento = await Evento.find(params.id)
    await evento.delete()
    session.flash({ notificacao: 'Evento removido com sucesso!' })
    return response.redirect('/eventos')
  }

  async alterar({ params, view }) {
    const evento = await Evento.find(params.id)

    return view.render('eventos/alterar', { evento: evento.toJSON() })
  }

  async detalhar({ params, view }) {
    const evento = await Evento.find(params.id)

    return view.render('eventos/detalhar', { evento: evento.toJSON() })
  }
}

module.exports = EventoController
