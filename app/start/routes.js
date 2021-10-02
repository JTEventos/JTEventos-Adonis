'use strict'

const LoginController = require('../app/Controllers/Http/LoginController');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Login
Route.get('/', 'LoginController.index')
Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')

//Eventos
Route.get('/eventos', 'EventoController.listar')
Route.get('/eventos/cadastrar', 'EventoController.cadastrar')
Route.post('/eventos/salvar', 'EventoController.salvar')
Route.post('/eventos/salvar/:id', 'EventoController.salvar')
Route.get('/eventos/alterar/:id', 'EventoController.alterar')
Route.post('/eventos/salvar/:id', 'EventoController.salvar')
Route.get('/eventos/deletar/:id', 'EventoController.deletar')
Route.get('/eventos/detalhar/:id', 'EventoController.detalhar')

//Clientes
Route.get('/clientes', 'ClienteController.listar')
Route.get('/clientes/cadastrar', 'ClienteController.cadastrar')
Route.post('/clientes/salvar', 'ClienteController.salvar')
Route.post('/clientes/salvar/:id', 'ClienteController.salvar')
Route.get('/clientes/alterar/:id', 'ClienteController.alterar')
Route.post('/clientes/salvar/:id', 'ClienteController.salvar')
Route.get('/clientes/deletar/:id', 'ClienteController.deletar')
Route.get('/clientes/detalhar/:id', 'ClienteController.detalhar')

//Códigos de erro
Route.get('/401', 'ErrorController.401')
Route.get('/404', 'ErrorController.404')
