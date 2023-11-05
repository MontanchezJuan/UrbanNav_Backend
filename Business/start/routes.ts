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
import './routes/driver.ts'
import './routes/service.ts'
import './routes/trip.ts'
import './routes/commentandrating.ts'
import './routes/bill.js'
import './routes/customer.js'
import './routes/license.js'
import './routes/vehicle.js'

Route.get('/', async () => {
  return { hello: 'world' }
})
