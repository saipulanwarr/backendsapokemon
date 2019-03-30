'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('register', 'AuthController.register').as('registerJwt');
  Route.post('login', 'AuthController.login');
  Route.get('profile', 'AuthController.profile').as('profileJwt').middleware(['auth:jwt'])
  Route.post('refresh', 'AuthController.refreshToken').as('refreshTokenJwt').middleware(['auth:jwt'])
  Route.post('logout', 'AuthController.logout').as('logoutJwt').middleware(['auth:jwt'])

  Route.get('categories', 'CategoryController.index');
  Route.post('categories', 'CategoryController.store');
  Route.patch('categories/:id', 'CategoryController.update');
  Route.delete('categories/:id', 'CategoryController.delete');

  Route.get('types', 'TypeController.index');
  Route.post('type', 'TypeController.store');
  Route.patch('type/:id', 'TypeController.update');
  Route.delete('type/:id', 'TypeController.delete');

  Route.get('pokemon', 'PokemonController.index');
  Route.get('pokemon/:id', 'PokemonController.detail');
  Route.post('pokemon', 'PokemonController.store');
  Route.patch('pokemon/:id', 'PokemonController.update');
  Route.delete('pokemon/:id', 'PokemonController.delete');

  Route.post('typespokemon', 'TypesPokemonController.store');
  Route.delete('typespokemon/:id', 'TypesPokemonController.delete');

}).prefix('api/v1');
