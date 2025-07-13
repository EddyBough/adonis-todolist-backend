/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .resource('tasks', () => import('#controllers/tasks_controller'))
  .apiOnly()
  .middleware('*', [middleware.auth()]) // ✅ ici on utilise middleware.auth()

router.get('/', async () => {
  return { hello: 'world' }
})
