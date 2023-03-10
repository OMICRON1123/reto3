/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/register','AuthController.register')
  Route.post('/login','AuthController.login')

  Route.group(() => {
    Route.get('/books','BooksController.index')
    Route.get('/books/:id','BooksController.show')
    Route.put('/books/update/:id','BooksController.update')
    Route.post('/books','BooksController.store')
    Route.delete('/books/delete/:id','BooksController.eliminarLibro')

    Route.get('/listarUsuarios','AuthController.listarTodo')
    Route.get('/listarUsuarios/:id','AuthController.listarId')
    Route.put('/editarUsuario/:id','AuthController.editarUsuario')
    Route.delete('/eliminarUsuario','AuthController.eliminarUsuario')
  }).middleware('auth')
}).prefix('api')
