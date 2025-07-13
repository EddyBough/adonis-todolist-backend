import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  /**
   * Display a list of resource
   */
  async index({ auth, response }: HttpContext) {
    // get the user connected (because of middleware "auth")
    const user = auth.user!

    // Get all tasks from this User
    const tasks = await user.related('tasks').query()

    // return tasks to JSON Form
    return response.ok(tasks)
  }

  /**
   * Display form to create a new record
   */
  //async create({ auth, response }: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const data = request.only(['title'])

    const task = await user.related('tasks').create({
      title: data.title,
      isCompleted: false,
    })
    return response.created(task)
  }

  //Get one task from this user
  async show({ params, auth, response }: HttpContext) {
    const user = auth.user! // get the user connected (because of middleware "auth")

    const task = await Task.findOrFail(params.id) // search the task by the ID

    if (task.userId !== user.id) {
      return response.unauthorized() // If she doesn't belong to the user, refused
    }

    return response.ok(task) // return tasks to json form
  }

  /**
   * Edit individual record
   */
  //async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!

    //we're doing the research and get the task by it's id (params.id)
    const task = await Task.findOrFail(params.id)

    //we verify the this task belongs to user who is connected, if not we return unauthorized
    if (task.userId !== user.id) {
      return response.unauthorized()
    }
    //we get only the data we want from the entire request body (from the model)
    const data = request.only(['title', 'isCompleted'])

    //Here we're updating the values from the request body
    task.title = data.title
    task.isCompleted = data.isCompleted

    await task.save() //Save the changes to the db
    return response.ok(task)
  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!

    const task = await Task.findOrFail(params.id)

    if (task.userId !== user.id) {
      return response.unauthorized()
    }
    await task.delete()
    return response.ok(task)
  }
}
