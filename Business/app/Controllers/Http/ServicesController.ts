import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'
import Service from 'App/Models/Service'
import Trip from 'App/Models/Trip'
import TripsController from './TripsController'
import { HttpContext } from '@adonisjs/core/build/standalone'

export default class ServicesController {
  public tripController = new TripsController()
  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      let services: Service[] = await Service.query()
        .preload('trip')
        .preload('customer')
        .preload('bill')
        .preload('commentsAndRatings')
        .paginate(page, perPage)
      if (services && services.length > 0) {
        return response
          .status(200)
          .json({ mensaje: 'registros de servicios encontrados', data: services })
      } else {
        return response
          .status(404)
          .json({ mensaje: 'No se encontraron registros de servicios', data: services })
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: 'Error en la busqueda de servicios', data: error })
    }
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      let service: Service | null = await Service.query()
        .where('id', params.id)
        .preload('trip')
        .preload('customer')
        .preload('bill')
        .preload('commentsAndRatings')
        .first()
      if (service != null) {
        return response
          .status(200)
          .json({ mensaje: 'registro del servicio encontrado', data: service })
      } else {
        return response
          .status(404)
          .json({ mensaje: 'No se encontro registro del servicio', data: service })
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: 'Error en la busqueda del servicio', data: error })
    }
  }
  public async store({ request, response }: HttpContextContract) {
    try {
      const body = request.body()
      let customer = await Customer.query().where('user_id', body.service.customer_id).first()
      body.service.customer_id = customer?.id
      if ((await Customer.query().where('id', body.service.customer_id).first()) != null) {
        if (body.trip_id) {
          let trip = await Trip.query().where('id', body.service.trip_id).first()
          if (trip != null) {
            body.service.price = trip.distance * 50
            const service = await Service.create(body.service)
            return response
              .status(201)
              .json({ mensaje: 'Servicio creado exitosamente', data: service })
          } else {
            return response
              .status(404)
              .json({ mensaje: 'No se encontro el viaje referenciado', data: body })
          }
        }
        body.service.price = body.trip.distance * 50
        console.log(body.trip.distance * 50)

        const service = await Service.create(body.service)
        const trip = await this.tripController.bkstore(service, body, response)
        return response
          .status(201)
          .json({ mensaje: 'Servicio creado exitosamente', data: { service: service, trip: trip } })
      } else {
        return response
          .status(404)
          .json({ mensaje: 'No se encontro el cliente referenciado', data: body })
      }
    } catch (error) {
      console.error(error)
      return response
        .status(500)
        .json({ mensaje: 'Error al crear el servicio', data: error.mensaje })
    }
  }
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body()
      const service: Service | null = await Service.query().where('id', params.id).first()
      if (service) {
        service.price = body.price ? body.price : service.price
        service.status = body.status ? body.status : service.status
        if (service.customer_id != body.customer_id) {
          if ((await Customer.query().where('id', body.customer_id).first()) != null) {
            service.customer_id = body.customer_id
          } else {
            return response
              .status(404)
              .json({ mensaje: 'No se encontro el cliente referenciado', data: body })
          }
        }
        if (service.trip_id != body.trip_id) {
          if ((await Trip.query().where('id', body.trip_id).first()) != null) {
            service.trip_id = body.trip_id
          } else {
            return response
              .status(404)
              .json({ mensaje: 'No se encontro el viaje referenciado', data: body })
          }
        }
        service.save()
        return response.status(201).json({ mensaje: 'Servicio actualizado con exito', data: body })
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: 'Error al crear el servicio', data: error.mensaje })
    }
  }
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const service: Service | null = await Service.query().where('id', params.id).first()
      if (service) {
        service.delete()
        return response.status(200).json({ mensaje: 'servicio eliminado', data: service })
      } else {
        return response
          .status(400)
          .json({ mensaje: 'no se encuentra el servicio a eliminar', data: service })
      }
    } catch (error) {
      return response
        .status(500)
        .json({ mensaje: 'Error en la eliminacion del servicio', data: error })
    }
  }
}
