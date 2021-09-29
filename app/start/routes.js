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

//Route.on('/').render('welcome')
//Login
Route.get('/', 'LoginController.index')
Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')

//Eventos
Route.get('/eventos', 'EventoController.listar')

//Códigos de erro
Route.get('/401', 'ErrorController.401')
Route.get('/404', 'ErrorController.404')

